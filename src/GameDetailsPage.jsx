import React from 'react';
import HomeButton from './HomeButton';

const GameDetailsPage = ({ game, onReturnHome }) => {
  return (
    <div>
      <h1>Game Details</h1>
      <h2>{game.homeTeam} vs. {game.awayTeam}</h2>
      <h3>Final Score: {game.homeTeam} {game.homeScore} - {game.awayTeam} {game.awayScore}</h3>
      <h3>Winner: {game.winner}</h3>
      <h3>Hits: {game.homeTeam} {game.homeHits} - {game.awayTeam} {game.awayHits}</h3>
      <h3>Runs per Inning:</h3>
      <table>
        <thead>
          <tr>
            <th>Inning</th>
            {game.innings.map((_, index) => (
              <th key={index}>{index + 1}</th>
            ))}
            <th>F</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{game.homeTeam}</td>
            {game.innings.map((inning, index) => (
              <td key={index}>{inning.home}</td>
            ))}
            <td>{game.homeScore}</td>
          </tr>
          <tr>
            <td>{game.awayTeam}</td>
            {game.innings.map((inning, index) => (
              <td key={index}>{inning.away}</td>
            ))}
            <td>{game.awayScore}</td>
          </tr>
        </tbody>
      </table>
      <HomeButton onReturnHome={onReturnHome} />
    </div>
  );
};

export default GameDetailsPage;