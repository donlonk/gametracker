import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
})();