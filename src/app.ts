import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { errorHandler, notFoundHandler } from "./errHandlers/errorHandlers";
import authRoutes from "./routes/authRoutes";
import carRoutes from "./routes/carRoute";

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", carRoutes);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running properly!");
});

// Handle 404 - Route Not Found
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

export default app;
