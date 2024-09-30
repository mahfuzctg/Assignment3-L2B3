import cors from 'cors';
import express from 'express';

import globalErrorHandler from './middlewares/globalErrorhandler';
import notFound from './middlewares/notFound';
import router from './routes';

const app = express();

// Middleware setup
app.use(express.json());
app.use(
  cors({
    origin: [
      'https://assignment3-phi-fawn.vercel.app', // Allow your frontend
      'http://localhost:5173', // Allow local development
    ],
    credentials: true, // Optional: set to true if using credentials
  }),
);

// Application routes
app.use('/api', router);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome To Car Rental Service!' });
});

// Error handling
app.use(notFound); // Handles 404 errors
app.use(globalErrorHandler); // Handles global errors

export default app;
