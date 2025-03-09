// backend/models/user.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  contribution: {
    type: Number,
    default: 0
  },
  money: {
    type: Number,
    default: 0
  },
  properties: [{
    type: {
      type: String,
      enum: ['maison', 'immeuble', 'usine'],
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    incomePerSecond: {
      type: Number,
      required: true
    }
  }],
  stocks: [{
    company: {
      type: String,
      required: true
    },
    shares: {
      type: Number,
      default: 0
    },
    purchasePrice: {
      type: Number
    }
  }],
  boosts: [{
    type: {
      type: String
    },
    multiplier: {
      type: Number
    },
    expiresAt: {
      type: Date
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);