import express from 'express';
import Game from '../models/Game.js';

const router = express.Router();

// Get all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new game
router.post('/', async (req, res) => {
  const game = new Game({
    date: req.body.date,
    homeTeam: req.body.homeTeam,
    awayTeam: req.body.awayTeam,
    homeScore: req.body.homeScore,
    awayScore: req.body.awayScore,
    homeHits: req.body.homeHits,
    awayHits: req.body.awayHits,
    innings: req.body.innings,
    winner: req.body.winner,
  });

  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;