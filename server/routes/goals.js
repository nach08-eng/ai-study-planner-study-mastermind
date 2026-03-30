const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Get all goals
router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.userId }).sort({ deadline: 1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals', error: error.message });
  }
});

// Create goal
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    
    const goal = new Goal({
      userId: req.userId,
      title,
      description,
      deadline,
    });

    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error creating goal', error: error.message });
  }
});

// Update goal progress manually or via linked tasks
router.patch('/:id/update-progress', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { tasksCount, completedTasksCount } = req.body;
    
    const goal = await Goal.findOne({ _id: id, userId: req.userId });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    
    if (tasksCount !== undefined) goal.tasksCount = tasksCount;
    if (completedTasksCount !== undefined) goal.completedTasksCount = completedTasksCount;
    
    await goal.save();
    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error updating goal', error: error.message });
  }
});

// Delete goal
router.delete('/:id', auth, async (req, res) => {
  try {
    await Goal.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Goal deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal', error: error.message });
  }
});

module.exports = router;
