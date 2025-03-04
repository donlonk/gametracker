import React, { useState, useRef } from 'react';
import HomeButton from './HomeButton';

const AddTeamPage = ({ onSaveTeam, onReturnHome }) => {
  const [teamName, setTeamName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerNumber, setPlayerNumber] = useState('');
  const [players, setPlayers] = useState([]);
  const [isTeamNameEntered, setIsTeamNameEntered] = useState(false);

  const playerNameRef = useRef(null);

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (playerName.trim() && playerNumber.trim()) {
      setPlayers([...players, { name: playerName, number: playerNumber }]);
      setPlayerName('');
      setPlayerNumber('');
      playerNameRef.current.focus();
    }
  };

  const handleTeamNameSubmit = (e) => {
    e.preventDefault();
    setIsTeamNameEntered(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const team = { name: teamName, players };
    onSaveTeam(team);
    // Reset the form
    setTeamName('');
    setPlayers([]);
    setIsTeamNameEntered(false);
  };

  return (
    <div>
      <h1>Add Team Page</h1>
      {!isTeamNameEntered ? (
        <form onSubmit={handleTeamNameSubmit}>
          <div>
            <label>Team Name:</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Next</button>
        </form>
      ) : (
        <div>
          <h2>Team: {teamName}</h2>
          <form onSubmit={handleAddPlayer}>
            <div>
              <label>Player Name:</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                ref={playerNameRef}
                required
              />
            </div>
            <div>
              <label>Player Number:</label>
              <input
                type="text"
                value={playerNumber}
                onChange={(e) => setPlayerNumber(e.target.value)}
                required
              />
            </div>
            <button type="submit">Add Player</button>
          </form>
          <div>
            <h2>Players:</h2>
            <ul>
              {players.map((player, index) => (
                <li key={index}>{player.name} - #{player.number}</li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleSubmit}>
            <button type="submit">Submit Team</button>
          </form>
        </div>
      )}
      <HomeButton onReturnHome={onReturnHome} />
    </div>
  );
};

export default AddTeamPage;