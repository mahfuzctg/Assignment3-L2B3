import cors from "cors";
import express, { Application, Request, Response } from "express";

import globalErrorHandler from "./middlewares/globalErrorhandler";

import notFound from "./middlewares/notFound";
import router from "./routes";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", router);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello Assignment 3!");
});
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
