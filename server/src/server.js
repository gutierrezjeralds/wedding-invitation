import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routerGoogle from './routers/Google.js';
import routerRsvp from './routers/Rsvp.js';
import routeTheme from './routers/Theme.js';
import dbConnect from './dbConn/Mongoose.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Boot up MongoDB
dbConnect()
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/google', routerGoogle);
app.use('/api/rsvp', routerRsvp);
app.use('/api/theme', routeTheme);

app.get('/api', (req, res) => {
  res.json({ message: 'API is running' });
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running locally on port ${PORT}`);
  });
}

export default app;