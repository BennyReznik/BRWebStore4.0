import express from "express";
import cors from "cors";
import { config } from "./routes";
import winston from "winston";
import expressWinston from "express-winston";
import logError from "./middleware/logError";
import { initPassport } from "./utils/passport";
import { createExpressWinstonOptions } from "./utils/logger";

initPassport();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(expressWinston.logger(createExpressWinstonOptions()));

Object.keys(config).forEach(k => {
  const routeConfig = config[k];
  app.use(routeConfig.prefix, routeConfig.router);
});

app.use(expressWinston.errorLogger(createExpressWinstonOptions()));

app.use(logError);

export { app };
