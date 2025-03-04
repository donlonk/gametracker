import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  players: [playerSchema],
});

const Team = mongoose.model('Team', teamSchema);

export default Team;