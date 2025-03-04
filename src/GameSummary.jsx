import React from 'react';
import HomeButton from './HomeButton';

const GameSummary = ({ homeTeam, awayTeam, homeScore, awayScore, winner, homeHits, awayHits, innings }) => {
  return (
    <div>
      <h1>Game Summary</h1>
      <h2>{homeTeam} vs. {awayTeam}</h2>
      <h3>Final Score: {homeTeam} {homeScore} - {awayTeam} {awayScore}</h3>
      <h3>Winner: {winner}</h3>
      <h3>Hits: {homeTeam} {homeHits} - {awayTeam} {awayHits}</h3>
      <h3>Runs per Inning:</h3>
      <table>
        <thead>
          <tr>
            <th>Inning</th>
            {innings.map((_, index) => (
              <th key={index}>{index + 1}</th>
            ))}
            <th>F</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{homeTeam}</td>
            {innings.map((inning, index) => (
              <td key={index}>{inning.home}</td>
            ))}
            <td>{homeScore}</td>
          </tr>
          <tr>
            <td>{awayTeam}</td>
            {innings.map((inning, index) => (
              <td key={index}>{inning.away}</td>
            ))}
            <td>{awayScore}</td>
          </tr>
        </tbody>
      </table>
      <HomeButton onReturnHome={() => window.location.reload()} />
    </div>
  );
};

export default GameSummary;