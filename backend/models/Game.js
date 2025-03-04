import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  homeScore: { type: Number, required: true },
  awayScore: { type: Number, required: true },
  homeHits: { type: Number, required: true },
  awayHits: { type: Number, required: true },
  innings: { type: Array, required: true },
  winner: { type: String, required: true },
});

const Game = mongoose.model('Game', gameSchema);

export default Game;