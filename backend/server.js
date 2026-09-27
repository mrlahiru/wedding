import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

// Connect Database
connectDB();

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
