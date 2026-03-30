const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'supersecretkey123', { expiresIn: '7d' });
    
    res.status(201).json({ token, user: { username: user.username, email: user.email, points: user.points, streakCount: user.streakCount } });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'supersecretkey123', { expiresIn: '7d' });
    
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, points: user.points, streakCount: user.streakCount } });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});

// Get User Profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Update User Streak & Points
router.post('/update-progress', auth, async (req, res) => {
  try {
    const { pointsToAdd } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.points += pointsToAdd || 0;
    
    // Simple streak logic
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (user.lastStudyDate) {
      const lastDate = new Date(user.lastStudyDate);
      lastDate.setHours(0, 0, 0, 0);
      
      const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        user.streakCount += 1;
      } else if (diffDays > 1) {
        user.streakCount = 1;
      }
    } else {
      user.streakCount = 1;
    }
    
    user.lastStudyDate = today;
    await user.save();
    
    res.json({ points: user.points, streakCount: user.streakCount });
  } catch (error) {
    res.status(500).json({ message: 'Error updating progress', error: error.message });
  }
});

module.exports = router;
