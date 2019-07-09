import path from "path";
import express from "express";
import cors from "cors";
import { config, clients } from "./routes";
import expressWinston from "express-winston";
import exphbs from "express-handlebars";
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

app.set("views", path.join(__dirname, "views"));
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: {
      increment: (v: number) => v + 1
    }
  })
);
app.set("view engine", "handlebars");

clients.forEach(o => app.use(`/app${o.prefix}`, o.router));

Object.keys(config).forEach(k => {
  const routeConfig = config[k];
  app.use(routeConfig.prefix, routeConfig.router);
});

app.use(expressWinston.errorLogger(createExpressWinstonOptions()));

app.use(logError);

export { app };
