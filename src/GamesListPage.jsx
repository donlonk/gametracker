import React from 'react';
import HomeButton from './HomeButton';

const GamesListPage = ({ games, onGameClick, onReturnHome }) => {
  return (
    <div>
      <h1>Games List</h1>
      <ul>
        {games.map((game, index) => (
          <li key={index} onClick={() => onGameClick(game)}>
            {game.homeTeam} vs. {game.awayTeam} - {game.date}
          </li>
        ))}
      </ul>
      <HomeButton onReturnHome={onReturnHome} />
    </div>
  );
};

export default GamesListPage;