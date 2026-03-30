const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
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
  duration: {
    type: Number, // in minutes
    required: true,
  },
  type: {
    type: String,
    enum: ['focus', 'short_break', 'long_break'],
    default: 'focus',
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
