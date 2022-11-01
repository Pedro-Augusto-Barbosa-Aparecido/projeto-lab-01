import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import { router } from "./routes";

config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
