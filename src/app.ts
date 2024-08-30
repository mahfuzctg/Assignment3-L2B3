import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import globalErrorHandler from './middlewares/globalErrorhandler';
import notFound from './middlewares/notFound';
import router from './routes';

//Create the Express.js application
const app = express();

// Set up the middleware
app.use(express.json());
app.use(
  cors({
    origin: ['https://assignment3-phi-fawn.vercel.app/'],
    credentials: true,
  }),
);
app.use(cookieParser());

//application routes
app.use('/api', router);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome To Car Rental Service!',
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
