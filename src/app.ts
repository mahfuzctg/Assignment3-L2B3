// app.ts

import cors from "cors";
import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import authRoutes from "./routes/authRoutes";
import carRoutes from "./routes/carRoute";

dotenv.config();
const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes); // Use carRoutes for /api/cars

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running properly!");
});

// Handle 404 - Route Not Found
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
