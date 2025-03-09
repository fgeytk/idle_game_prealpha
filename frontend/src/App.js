// frontend/src/App.js
import React from 'react';
import GameContainer from './components/GameContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Idle Clicker Communautaire</h1>
      </header>
      <main>
        <GameContainer />
      </main>
      <footer>
        <p>Un jeu idle/clicker communautaire</p>
      </footer>
    </div>
  );
}

export default App;