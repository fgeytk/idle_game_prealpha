// frontend/src/components/Counter.js
import React from 'react';

function Counter({ value }) {
  return (
    <div className="counter">
      <h2>Compteur Global</h2>
      <div className="counter-value">${value.toLocaleString()}</div>
    </div>
  );
}

export default Counter;