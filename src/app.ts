import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// app.use("/api/users", userRoutes);
// app.use("/api/cars", carRoutes);
// app.use("/api/reservations", reservationRoutes);

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

export default app;
