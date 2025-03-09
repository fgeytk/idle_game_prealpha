// frontend/src/components/ClickButton.js
import React from 'react';

function ClickButton({ onClick }) {
  return (
    <button className="click-button" onClick={onClick}>
      Cliquer pour ajouter $1
    </button>
  );
}

export default ClickButton;