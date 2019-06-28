import { Request, Response, NextFunction } from "express";

function logError(err: any, req: Request, res: Response, next: NextFunction) {
  if (err && err.isJoi) {
    res.status(400).send(err.details);
  } else {
    res.sendStatus(500);
  }
}

export default logError;
