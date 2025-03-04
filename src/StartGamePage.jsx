import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomeButton from './HomeButton';
import GameSummary from './GameSummary';

const StartGamePage = ({ teams, addGame, onReturnHome }) => {
  const [gameDate, setGameDate] = useState('');
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isInningStarted, setIsInningStarted] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [balls, setBalls] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [outs, setOuts] = useState(0);
  const [inningHalf, setInningHalf] = useState('top'); // 'top' or 'bottom'
  const [currentTeam, setCurrentTeam] = useState(null);
  const [inningNumber, setInningNumber] = useState(1);
  const [isHit, setIsHit] = useState(false);
  const [hitType, setHitType] = useState('');
  const [hitLocation, setHitLocation] = useState('');
  const [isOut, setIsOut] = useState(false);
  const [outLocation, setOutLocation] = useState('');
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [homeHits, setHomeHits] = useState(0);
  const [awayHits, setAwayHits] = useState(0);
  const [innings, setInnings] = useState([]);
  const [winner, setWinner] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (inningHalf === 'top') {
      const awayTeamObj = teams.find(team => team.name === awayTeam);
      setCurrentTeam(awayTeamObj);
    } else {
      const homeTeamObj = teams.find(team => team.name === homeTeam);
      setCurrentTeam(homeTeamObj);
    }
  }, [inningHalf, homeTeam, awayTeam, teams]);

  useEffect(() => {
    if (currentTeam && currentTeam.players.length > 0) {
      setCurrentPlayerIndex(0);
    }
  }, [currentTeam]);

  useEffect(() => {
    if (inningNumber > innings.length) {
      setInnings([...innings, { home: 0, away: 0 }]);
    }
  }, [inningNumber, innings]);

  const handleDateSubmit = (e) => {
    e.preventDefault();
    setIsDateSelected(true);
  };

  const handleTeamSubmit = (e) => {
    e.preventDefault();
    setIsGameStarted(true);
  };

  const handleStartInning = () => {
    if (currentTeam && currentTeam.players.length > 0) {
      setCurrentPlayerIndex(0);
      setIsInningStarted(true);
    }
  };

  const handleBall = () => {
    if (balls < 3) {
      setBalls(balls + 1);
    } else {
      // Record a walk
      console.log(`${currentTeam.players[currentPlayerIndex].name} walked.`);
      setBalls(0);
      setStrikes(0);
      setCurrentPlayerIndex((currentPlayerIndex + 1) % currentTeam.players.length);
    }
  };

  const handleStrike = () => {
    if (strikes < 2) {
      setStrikes(strikes + 1);
    } else {
      // Record an out
      console.log(`${currentTeam.players[currentPlayerIndex].name} struck out.`);
      setBalls(0);
      setStrikes(0);
      setOuts(outs + 1);
      if (outs + 1 === 3) {
        handleNextHalfInning();
      } else {
        setCurrentPlayerIndex((currentPlayerIndex + 1) % currentTeam.players.length);
      }
    }
  };

  const handleHit = () => {
    setIsHit(true);
  };

  const handleOut = () => {
    setIsOut(true);
  };

  const handleHitTypeChange = (e) => {
    setHitType(e.target.value);
  };

  const handleHitLocationSubmit = (e) => {
    e.preventDefault();
    if (hitType === 'home run') {
      console.log(`${currentTeam.players[currentPlayerIndex].name} hit a home run.`);
      if (inningHalf === 'top') {
        setAwayScore(awayScore + 1);
        setAwayHits(awayHits + 1);
        setInnings(innings.map((inning, index) => index === inningNumber - 1 ? { ...inning, away: inning.away + 1 } : inning));
      } else {
        setHomeScore(homeScore + 1);
        setHomeHits(homeHits + 1);
        setInnings(innings.map((inning, index) => index === inningNumber - 1 ? { ...inning, home: inning.home + 1 } : inning));
      }
    } else {
      console.log(`${currentTeam.players[currentPlayerIndex].name} hit a ${hitType} to ${hitLocation}.`);
      if (inningHalf === 'top') {
        setAwayHits(awayHits + 1);
      } else {
        setHomeHits(homeHits + 1);
      }
    }
    setHitType('');
    setHitLocation('');
    setIsHit(false);
    setBalls(0);
    setStrikes(0);
    setCurrentPlayerIndex((currentPlayerIndex + 1) % currentTeam.players.length);
  };

  const handleOutLocationSubmit = (e) => {
    e.preventDefault();
    console.log(`${currentTeam.players[currentPlayerIndex].name} out at ${outLocation}.`);
    setOutLocation('');
    setIsOut(false);
    setBalls(0);
    setStrikes(0);
    setOuts(outs + 1);
    if (outs + 1 === 3) {
      handleNextHalfInning();
    } else {
      setCurrentPlayerIndex((currentPlayerIndex + 1) % currentTeam.players.length);
    }
  };

  const handleNextHalfInning = () => {
    if (inningNumber >= 9) {
      if (inningHalf === 'top' && homeScore > awayScore) {
        setWinner(homeTeam);
        saveGame();
        setShowSummary(true);
        return;
      }
      if (inningHalf === 'bottom' && homeScore !== awayScore) {
        setWinner(homeScore > awayScore ? homeTeam : awayTeam);
        saveGame();
        setShowSummary(true);
        return;
      }
    }
    setOuts(0);
    setBalls(0);
    setStrikes(0);
    if (inningHalf === 'bottom') {
      setInningNumber(inningNumber + 1);
    }
    setInningHalf(inningHalf === 'top' ? 'bottom' : 'top');
    setTimeout(() => {
      if (currentTeam && currentTeam.players.length > 0) {
        setCurrentPlayerIndex(0);
        setIsInningStarted(true);
      }
    }, 1000); // Automatically start the next half inning after a short delay
  };

  const handleAddRun = () => {
    if (inningHalf === 'top') {
      setAwayScore(awayScore + 1);
      setInnings(innings.map((inning, index) => index === inningNumber - 1 ? { ...inning, away: inning.away + 1 } : inning));
    } else {
      setHomeScore(homeScore + 1);
      setInnings(innings.map((inning, index) => index === inningNumber - 1 ? { ...inning, home: inning.home + 1 } : inning));
    }
  };

  const handleRemoveRun = () => {
    if (inningHalf === 'top' && awayScore > 0) {
      setAwayScore(awayScore - 1);
      setInnings(innings.map((inning, index) => index === inningNumber - 1 ? { ...inning, away: inning.away - 1 } : inning));
    } else if (inningHalf === 'bottom' && homeScore > 0) {
      setHomeScore(homeScore - 1);
      setInnings(innings.map((inning, index) => index === inningNumber - 1 ? { ...inning, home: inning.home - 1 } : inning));
    }
  };

  const saveGame = async () => {
    const gameData = {
      date: gameDate,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      homeHits,
      awayHits,
      innings,
      winner,
    };

    try {
      await axios.post('http://localhost:5000/api/games', gameData);
      console.log('Game saved successfully');
      addGame(gameData);
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  return (
    <div>
      {showSummary ? (
        <GameSummary
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          homeScore={homeScore}
          awayScore={awayScore}
          winner={winner}
          homeHits={homeHits}
          awayHits={awayHits}
          innings={innings}
          onReturnHome={() => setShowSummary(false)}
        />
      ) : (
        <>
          <h1>{isGameStarted ? `${homeTeam} vs. ${awayTeam}` : 'Start Game Page'}</h1>
          <h2>Score: {homeTeam} {homeScore} - {awayTeam} {awayScore}</h2>
          {!isDateSelected ? (
            <form onSubmit={handleDateSubmit}>
              <div>
                <label>Game Date:</label>
                <input
                  type="date"
                  value={gameDate}
                  onChange={(e) => setGameDate(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Next</button>
            </form>
          ) : !isGameStarted ? (
            <div>
              <h2>Game Date: {gameDate}</h2>
              <form onSubmit={handleTeamSubmit}>
                <div>
                  <label>Home Team:</label>
                  <select
                    value={homeTeam}
                    onChange={(e) => setHomeTeam(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select a team</option>
                    {teams.map((team, index) => (
                      <option key={index} value={team.name}>{team.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Away Team:</label>
                  <select
                    value={awayTeam}
                    onChange={(e) => setAwayTeam(e.target.value)}
                    required
                    disabled={!homeTeam}
                  >
                    <option value="" disabled>Select a team</option>
                    {teams
                      .filter((team) => team.name !== homeTeam)
                      .map((team, index) => (
                        <option key={index} value={team.name}>{team.name}</option>
                      ))}
                  </select>
                </div>
                <button type="submit" disabled={!homeTeam || !awayTeam}>Start Game</button>
              </form>
            </div>
          ) : (
            <div>
              <h2>{inningHalf === 'top' ? 'Top' : 'Bottom'} of the {inningNumber} Inning</h2>
              <h3>Current Team: {currentTeam?.name}</h3>
              <h3>Current Player: {currentTeam?.players[currentPlayerIndex]?.name} - #{currentTeam?.players[currentPlayerIndex]?.number}</h3>
              <div>
                <button onClick={handleBall}>Ball</button>
                <button onClick={handleStrike}>Strike</button>
                <button onClick={handleHit}>Hit</button>
                <button onClick={handleOut}>Out</button>
              </div>
              <div>
                <p>Balls: {balls}</p>
                <p>Strikes: {strikes}</p>
                <p>Outs: {outs}</p>
              </div>
              <div>
                <button onClick={handleAddRun}>Add Run</button>
                <button onClick={handleRemoveRun}>Remove Run</button>
              </div>
              {isHit && (
                <form onSubmit={handleHitLocationSubmit}>
                  <label>Hit Type:</label>
                  <select value={hitType} onChange={handleHitTypeChange} required>
                    <option value="" disabled>Select hit type</option>
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="triple">Triple</option>
                    <option value="home run">Home Run</option>
                  </select>
                  {hitType !== 'home run' && (
                    <>
                      <label>Hit Location:</label>
                      <input
                        type="text"
                        value={hitLocation}
                        onChange={(e) => setHitLocation(e.target.value)}
                        required
                      />
                    </>
                  )}
                  <button type="submit">Submit</button>
                </form>
              )}
              {isOut && (
                <form onSubmit={handleOutLocationSubmit}>
                  <label>Out Location:</label>
                  <input
                    type="text"
                    value={outLocation}
                    onChange={(e) => setOutLocation(e.target.value)}
                    required
                  />
                  <button type="submit">Submit</button>
                </form>
              )}
            </div>
          )}
          <HomeButton onReturnHome={onReturnHome} />
        </>
      )}
    </div>
  );
};

export default StartGamePage;