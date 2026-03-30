const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Get all tasks for user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ deadline: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
});

// Create task
router.post('/', auth, async (req, res) => {
  try {
    const { title, subject, deadline, priority, difficultyLevel } = req.body;
    
    const task = new Task({
      userId: req.userId,
      title,
      subject,
      deadline,
      priority,
      difficultyLevel,
      nextReviewDate: deadline || Date.now(),
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
});

// Update task completion & Spaced Repetition
router.patch('/:id/complete', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { quality } = req.body; // quality of recall (0-5 or easy/medium/hard)
    
    const task = await Task.findOne({ _id: id, userId: req.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    // Spaced Repetition Logic (Generalized SM-2)
    // Quality: 0-5 (0=fail, 5=perfect)
    // We'll use difficultyLevel to map to quality:
    // easy=5, medium=3, hard=2
    let q = 3;
    if (quality === 'easy') q = 5;
    if (quality === 'medium') q = 3;
    if (quality === 'hard') q = 1;

    task.isCompleted = true;
    task.completedAt = new Date();
    
    // Calculate next review date
    if (q >= 3) {
      if (task.repetitionCount === 0) {
        task.repetitionCount = 1;
        task.easeFactor = 2.5; // Interval 1 day
      } else if (task.repetitionCount === 1) {
        task.repetitionCount = 6; // Interval 6 days
      } else {
        task.repetitionCount = Math.round(task.repetitionCount * task.easeFactor);
      }
      
      // Update ease factor: EF = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
      task.easeFactor = Math.max(1.3, task.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
      
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + task.repetitionCount);
      task.nextReviewDate = nextDate;
    } else {
      // Failed, reset repetition count
      task.repetitionCount = 1;
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + 1);
      task.nextReviewDate = nextDate;
    }

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});

// Get upcoming tasks for AI scheduling
router.get('/schedule', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ 
      userId: req.userId, 
      isCompleted: false,
      nextReviewDate: { $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } // next 7 days
    }).sort({ nextReviewDate: 1, priority: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedule', error: error.message });
  }
});

module.exports = router;
