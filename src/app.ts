import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import globalErrorHandler from './middlewares/globalErrorhandler';
import notFound from './middlewares/notFound';
import router from './routes';
import cookieParser from 'cookie-parser';

const app = express();

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// File upload middleware using multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpg, .jpeg, and .png files are allowed!'));
    }
  },
});

// Middleware setup
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['https://assignment3-phi-fawn.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

// Logging middleware to trace incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Endpoint for image uploads
app.post('/api/upload', upload.single('image'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded!' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

// Serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
