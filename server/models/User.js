const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  streakCount: {
    type: Number,
    default: 0,
  },
  lastStudyDate: {
    type: Date,
  },
  settings: {
    subjects: [String],
    studyHoursPerDay: Number,
    difficultyPreference: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    darkMode: {
      type: Boolean,
      default: true,
    },
  },
  achievements: [{
    name: String,
    description: String,
    dateEarned: {
      type: Date,
      default: Date.now,
    },
  }],
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
