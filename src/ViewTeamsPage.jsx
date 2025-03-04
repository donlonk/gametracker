import React, { useState } from 'react';
import HomeButton from './HomeButton';

const ViewTeamsPage = ({ teams, onReturnHome }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  return (
    <div>
      <h1>View Teams Page</h1>
      {selectedTeam ? (
        <div>
          <h2>Team: {selectedTeam.name}</h2>
          <h3>Players:</h3>
          <ul>
            {selectedTeam.players.map((player, index) => (
              <li key={index}>{player.name} - #{player.number}</li>
            ))}
          </ul>
          <button onClick={() => setSelectedTeam(null)}>Back to Teams</button>
        </div>
      ) : (
        <div>
          <h2>Teams:</h2>
          <ul>
            {teams.map((team, index) => (
              <li key={index}>
                <button onClick={() => handleTeamClick(team)} style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                  {team.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <HomeButton onReturnHome={onReturnHome} />
    </div>
  );
};

export default ViewTeamsPage;