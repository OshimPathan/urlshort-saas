import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import passport from 'passport';

import authRoutes from './src/routes/auth.js';
import oauthRoutes from './src/routes/oauth.js';
import urlRoutes from './src/routes/urls.js';
import redirectRoutes from './src/routes/redirect.js';
import analyticsRoutes from './src/routes/analytics.js';
import billingRoutes, { stripeWebhook } from './src/routes/billing.js';
import { initSockets } from './src/sockets.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.io
initSockets(server);

// CORS - Allow multiple origins
const allowedOrigins = [
  'http://localhost:5173',
  process.env.CORS_ORIGIN,
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({ 
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all in development
    }
  },
  credentials: true 
}));

// Stripe webhooks need raw body
app.post('/webhooks/stripe', bodyParser.raw({ type: 'application/json' }), stripeWebhook);

// Standard middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));
app.use(passport.initialize());

// Rate limit
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 });
app.use('/api/', apiLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', oauthRoutes); // OAuth routes
app.use('/api/urls', urlRoutes);
app.use('/', redirectRoutes); // /r/:code
app.use('/api/analytics', analyticsRoutes);
app.use('/api/billing', billingRoutes);

app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/urlshort';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Mongo connection error:', err.message);
    process.exit(1);
  });
