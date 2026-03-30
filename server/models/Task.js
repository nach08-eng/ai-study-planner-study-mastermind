const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
  },
  // Spaced Repetition Fields
  repetitionCount: {
    type: Number,
    default: 0,
  },
  nextReviewDate: {
    type: Date,
    default: Date.now,
  },
  difficultyLevel: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
  },
  easeFactor: {
    type: Number,
    default: 2.5,
  },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
