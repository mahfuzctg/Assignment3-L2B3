import cors from 'cors';
import express from 'express';
import globalErrorHandler from './middlewares/globalErrorhandler';
import notFound from './middlewares/notFound';
import router from './routes';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware setup

app.use(express.json());
app.use(cookieParser());

app.use( cors({
    origin: [
      'https://assignment3-phi-fawn.vercel.app', 
      'http://localhost:5173', 
     
    ],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'], 
    credentials: true, 
  }),
);

// Logging middleware to trace incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

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
