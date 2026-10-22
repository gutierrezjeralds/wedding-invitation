/*eslint no-console: 0*/

/**
- Date Created: 09/14/2026
- Objective: API Server
 */

import express from 'express';
import cors from 'cors';
// import helmet from 'helmet';
import dotenv from 'dotenv';
import routerGoogle from './routers/Google.js';
import routerRsvp from './routers/Rsvp.js';
import routeTheme from './routers/Theme.js';
import dbConnect from './dbConn/Mongoose.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// Middleware
// app.use(helmet());
app.use(cors());
app.use(express.json());

// 2. Connect to MongoDB when the server boots up (or use middleware per route)
dbConnect()
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'API is running',
  });
});

// Collection of routes.
app.use('/api/google', routerGoogle);
app.use('/api/rsvp', routerRsvp);
app.use('/api/theme', routeTheme);

// Start Server (CRITICAL: Keeps process running)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;