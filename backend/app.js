import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import gameRoutes from './routes/games.js';
import teamRoutes from './routes/teams.js';
app.use('/api/games', gameRoutes);
app.use('/api/teams', teamRoutes);

export default app;