/*eslint no-console: 0*/

/**
 * Date Created: 09/14/2026
 * Objective: API Server
 */

import express from 'express';
import cors from 'cors';
// import helmet from 'helmet';
import dotenv from 'dotenv';
import routerGoogle from './routers/Google.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// Middleware
// app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'API is running',
  });
});

/**
 * Collection of routes.
 */
// Google Routes
app.use('/api/google', routerGoogle);

export default app;