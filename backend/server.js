// backend/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const Game = require('./models/game');
const connectDB = require('./config/db');

// Initialiser l'application Express
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Connecter à la base de données
connectDB();

// Middleware pour attacher socket.io à l'objet de requête
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes API
app.use('/api', apiRoutes);

// Logique WebSocket
io.on('connection', (socket) => {
  console.log('Un utilisateur s\'est connecté:', socket.id);

  // Envoyer la valeur actuelle du compteur quand un utilisateur se connecte
  Game.findOne().then(game => {
    socket.emit('counter_update', { counter: game ? game.counter : 0 });
  });

  socket.on('increment_counter', async (data) => {
    try {
      // Incrémenter le compteur dans la base de données
      const game = await Game.findOneAndUpdate(
        {}, 
        { $inc: { counter: 1 } },
        { new: true, upsert: true }
      );
      
      // Émettre la nouvelle valeur à tous les clients connectés
      io.emit('counter_update', { counter: game.counter });
    } catch (err) {
      console.error('Erreur lors de l\'incrémentation:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté:', socket.id);
  });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));