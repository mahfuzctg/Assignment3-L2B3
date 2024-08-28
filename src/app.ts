import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './middlewares/globalErrorhandler';
import notFound from './middlewares/notFound';
import router from './routes';

const app: Application = express();

//parsers
app.use(express.json());
// app.use(cookieParser());

app.use(cors({}));

// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome back to the server!');
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
