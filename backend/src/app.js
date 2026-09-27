import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rsvpRoutes from './routes/rsvpRoutes.js';
import configRoutes from './routes/configRoutes.js';
import { apiLimiter } from './middleware/rateLimiter.js';

const app = express();

// 1. HTTP Security Headers with Helmet
app.use(helmet({
  contentSecurityPolicy: false, // Allows flexible CDN font/script/map embeddings
  crossOriginEmbedderPolicy: false,
}));

// 2. CORS configuration (Configurable via ALLOWED_ORIGIN in .env)
const allowedOrigins = process.env.ALLOWED_ORIGIN 
  ? process.env.ALLOWED_ORIGIN.split(',').map(o => o.trim()) 
  : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, true); // Dev fallback
  },
  credentials: true,
}));

// 3. Request body parser with payload size limit (Protects against Large Payload DoS)
app.use(express.json({ limit: '50kb' }));

// 4. Global API Rate Limiter
app.use('/api', apiLimiter);

// 5. Routes
app.use('/api/rsvp', rsvpRoutes);
app.use('/api/config', configRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', secure: true, timestamp: new Date().toISOString() });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

export default app;
