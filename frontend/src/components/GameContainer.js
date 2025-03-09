import React, { useState, useEffect } from 'react';
import Counter from './Counter';
import ClickButton from './ClickButton';
import { connectSocket } from '../websocket';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function GameContainer() {
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Connexion au serveur WebSocket
    const socket = connectSocket();
    
    // Écouter les mises à jour du compteur
    socket.on('counter_update', (data) => {
      setCounter(data.counter);
    });
    
    // Charger l'état initial du compteur
    const fetchCounter = async () => {
      try {
        const response = await axios.get(`${API_URL}/counter`);
        setCounter(response.data.counter);
        setIsLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement du compteur:', err);
        setError('Impossible de charger les données du jeu.');
        setIsLoading(false);
      }
    };
    
    fetchCounter();
    
    // Nettoyage à la déconnexion
    return () => {
      socket.off('counter_update');
    };
  }, []);

  const handleClick = async () => {
    try {
      // Option 1: Incrémenter via WebSocket (plus rapide, meilleure UX)
      const socket = connectSocket();
      socket.emit('increment_counter');
      
      // Option 2: Incrémenter via API REST (plus fiable, mais moins réactif)
      // await axios.post(`${API_URL}/increment`);
    } catch (err) {
      console.error('Erreur lors de l\'incrémentation:', err);
      setError('Erreur lors de l\'envoi de votre clic.');
    }
  };

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="game-container">
      <Counter value={counter} />
      <ClickButton onClick={handleClick} />
      <div className="stats">
        <h2>Statistiques</h2>
        <p>Valeur globale: ${counter.toLocaleString()}</p>
        {/* Ici vous pourrez ajouter d'autres statistiques par la suite */}
      </div>
    </div>
  );
}

export default GameContainer;