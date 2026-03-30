const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Simple Rule-Based AI Chat
router.post('/chat', auth, async (req, res) => {
  try {
    const { message } = req.body;
    const user = await User.findById(req.userId);
    const tasks = await Task.find({ userId: req.userId, isCompleted: false }).sort({ nextReviewDate: 1, priority: -1 });
    
    let botResponse = "I'm sorry, I couldn't quite understand that. Try asking 'What should I study now?'";
    
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('study now') || lowerMessage.includes('next task') || lowerMessage.includes('priority')) {
      if (tasks.length > 0) {
        const topTask = tasks[0];
        const priorityLevel = topTask.priority === 'high' ? 'critically important' : 'recommended';
        botResponse = `Based on your schedule, you should study **${topTask.subject}**! The task is: "${topTask.title}". It's ${priorityLevel} because it's due on ${topTask.deadline ? new Date(topTask.deadline).toLocaleDateString() : 'no set deadline'}. Ready to start?`;
      } else {
        botResponse = "You're all caught up! Great job. Maybe take a 5-minute break or set a new goal?";
      }
    } else if (lowerMessage.includes('progress') || lowerMessage.includes('how am i doing')) {
      const completedCount = await Task.countDocuments({ userId: req.userId, isCompleted: true });
      botResponse = `You've completed **${completedCount} tasks** so far. You currently have a **${user.streakCount}-day streak**. Keep it up! To see more details, check your Analytics page.`;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      botResponse = `Hello ${user.username}! I'm your AI Study Assistant. How can I help you today? I can suggest your next task, check your progress, or help you set goals.`;
    } else if (lowerMessage.includes('pomodoro') || lowerMessage.includes('focus')) {
      botResponse = "Focus mode is a great way to stay productive! I recommend doing 25 minutes of focused study followed by a 5-minute break. Head over to the Focus Mode page to start your timer.";
    }

    res.json({ response: botResponse });
  } catch (error) {
    res.status(500).json({ message: 'Error in AI response', error: error.message });
  }
});

// AI Suggestion for Smart Scheduling optimization
router.get('/suggestions', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const tasks = await Task.find({ userId: req.userId, isCompleted: false });
    
    // Suggestion logic: 
    // If user has many high-priority tasks and low study-hours setting, suggest increasing hours.
    // If user completes tasks quickly, suggest higher difficulty.
    
    let suggestion = "Try to maintain your daily streak of 3+ days for better consistency.";
    
    if (tasks.length > 10) {
      suggestion = "You have a lot of pending tasks. Try breaking down your goals into smaller, manageable sub-tasks.";
    } else if (tasks.some(t => t.priority === 'high' && t.deadline < new Date())) {
      suggestion = "Priority Alert: You have overdue high-priority tasks. I've re-prioritized them at the top of your list.";
    }

    res.json({ suggestion });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching suggestions', error: error.message });
  }
});

module.exports = router;
