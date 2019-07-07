import { Request, Response, NextFunction } from "express";
import { getOrThrow, idSchema } from "../validations";

const checkIfIdIsNumber = (
  req: Request,
  res: Response,
  next?: NextFunction
): Promise<any> => {
  if (isNaN(req.params.id)) {
    getOrThrow<number>(req.params.id, idSchema);
  }
  if (next) {
    next();
  }

  return Promise.resolve();
};

export { checkIfIdIsNumber };
