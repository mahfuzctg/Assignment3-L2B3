// src/app.ts

import cors from "cors";
import express, { Application, Request, Response } from "express";

import globalErrorHandler from "./middlewares/globalErrorhandler";
import notFound from "./middlewares/notFound";
import router from "./routes";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", router);

// Default route
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello Assignment 3!");
});

// Error handling middleware
app.use(globalErrorHandler);

// Not Found middleware
app.use(notFound);

export default app;
