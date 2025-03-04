import express from 'express';
import Team from '../models/Team.js';

const router = express.Router();

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new team
router.post('/', async (req, res) => {
  const team = new Team({
    name: req.body.name,
    players: req.body.players,
  });

  try {
    const newTeam = await team.save();
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;