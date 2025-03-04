import React from 'react';
import './WelcomePage.css';

const WelcomePage = ({ onAddTeam, onViewTeams, onStartGame }) => {
  return (
    <div className="welcome-container">
      <h1>Welcome to the Game Tracker</h1>
      <div className="button-container">
        <button onClick={onAddTeam}>Add Team</button>
        <button onClick={onViewTeams}>View Teams</button>
        <button onClick={onStartGame}>Start a New Game</button>
      </div>
    </div>
  );
};

export default WelcomePage;