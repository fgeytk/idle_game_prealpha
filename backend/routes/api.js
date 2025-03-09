// backend/routes/api.js
const express = require('express');
const router = express.Router();
const Game = require('../models/game');
const User = require('../models/user');

// Route pour obtenir la valeur actuelle du compteur
router.get('/counter', async (req, res) => {
  try {
    const game = await Game.findOne();
    res.json({ counter: game ? game.counter : 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route pour incrémenter le compteur
router.post('/increment', async (req, res) => {
  try {
    // Incrémenter le compteur global
    const game = await Game.findOneAndUpdate(
      {}, 
      { $inc: { counter: 1 }, lastUpdated: Date.now() },
      { new: true, upsert: true }
    );
    
    // Mettre à jour tous les clients via WebSocket
    req.io.emit('counter_update', { counter: game.counter });
    
    // Optionnel: Si l'utilisateur est authentifié, mettre à jour sa contribution
    // if (req.body.userId) {
    //   await User.findByIdAndUpdate(
    //     req.body.userId,
    //     { $inc: { contribution: 1 } }
    //   );
    // }
    
    res.json({ success: true, counter: game.counter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route pour obtenir le classement des joueurs
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find().sort({ contribution: -1 }).limit(10).select('username contribution');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;