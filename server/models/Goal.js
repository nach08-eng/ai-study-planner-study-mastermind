const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
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
  deadline: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'archived'],
    default: 'active',
  },
  tasksCount: {
    type: Number,
    default: 0,
  },
  completedTasksCount: {
    type: Number,
    default: 0,
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
}, { timestamps: true });

// Auto-calculate progress based on tasks count
goalSchema.pre('save', function (next) {
  if (this.tasksCount > 0) {
    this.progress = Math.round((this.completedTasksCount / this.tasksCount) * 100);
  } else {
    this.progress = 0;
  }
  next();
});

module.exports = mongoose.model('Goal', goalSchema);
