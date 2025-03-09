// backend/models/game.js
const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  counter: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', GameSchema);