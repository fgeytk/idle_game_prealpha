import { io } from 'socket.io-client';

// Création de l'instance socket sans connexion immédiate
export let socket;

export const connectSocket = () => {
  if (!socket) {
    socket = io('http://localhost:5000');
    
    socket.on('connect', () => {
      console.log('Connecté au serveur WebSocket');
    });
    
    socket.on('disconnect', () => {
      console.log('Déconnecté du serveur WebSocket');
    });
  }
  
  return socket;
};