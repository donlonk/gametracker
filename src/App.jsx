import React, { useState } from 'react';
import WelcomePage from './WelcomePage';
import AddTeamPage from './AddTeamPage';
import ViewTeamsPage from './ViewTeamsPage';
import StartGamePage from './StartGamePage';
import './App.css';

const App = () => {
  const [page, setPage] = useState('welcome');
  const [teams, setTeams] = useState([]);

  const handleAddTeam = () => {
    setPage('addTeam');
  };

  const handleViewTeams = () => {
    setPage('viewTeams');
  };

  const handleStartGame = () => {
    setPage('startGame');
  };

  const handleReturnHome = () => {
    setPage('welcome');
  };

  const handleSaveTeam = (team) => {
    setTeams([...teams, team]);
    setPage('welcome');
  };

  return (
    <div className="app-container">
      {page === 'welcome' && (
        <WelcomePage
          onAddTeam={handleAddTeam}
          onViewTeams={handleViewTeams}
          onStartGame={handleStartGame}
        />
      )}
      {page === 'addTeam' && <AddTeamPage onSaveTeam={handleSaveTeam} onReturnHome={handleReturnHome} />}
      {page === 'viewTeams' && <ViewTeamsPage teams={teams} onReturnHome={handleReturnHome} />}
      {page === 'startGame' && <StartGamePage teams={teams} onReturnHome={handleReturnHome} />}
    </div>
  );
};

export default App;