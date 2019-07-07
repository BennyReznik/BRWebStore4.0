import path from "path";
import express from "express";
import cors from "cors";
import { config } from "./routes";
import expressWinston from "express-winston";
import logError from "./middleware/logError";
import { createExpressWinstonOptions } from "./utils/logger";
import { initPassport } from "./utils/passport";

initPassport();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(expressWinston.logger(createExpressWinstonOptions()));
app.use("/public", express.static(path.join(__dirname, "public")));

Object.keys(config).forEach(k => {
  const routeConfig = config[k];
  app.use(routeConfig.prefix, routeConfig.router);
});

app.use(expressWinston.errorLogger(createExpressWinstonOptions()));

app.use(logError);

export { app };
