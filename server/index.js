const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const goalRoutes = require('./routes/goals');
const aiRoutes = require('./routes/ai');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/ai', aiRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('AI Study Planner API is running...');
});

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-study-planner';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    // Fallback logic for development without MongoDB
    console.log('Falling back to local development without DB persistence...');
    app.listen(PORT, () => {
      console.log(`Server is running in mock mode on port ${PORT}`);
    });
  });
