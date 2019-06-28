import passport from "passport";
import { UserRole, IUserCredential } from "../models";
import { Request, Response, NextFunction } from "express";

export function authenticate() {
  return passport.authenticate("jwt", { session: false });
}

export function authorize(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      res.sendStatus(401);
      return;
    }
    const user = req.user as IUserCredential;
    if (!roles.find(r => user.roles.indexOf(r) >= 0)) {
      res.sendStatus(403);
      return;
    }
    next();
  };
}
