import passport from "passport";
import { UserRole, IUserCredential } from "../models";
import { Request, Response, NextFunction } from "express";
import config, { KnownConfigKey } from "../utils/config";

export function authenticate() {
  if (config.get(KnownConfigKey.ShouldAuthenticate) === "true") {
    return passport.authenticate("jwt", { session: false });
  } else {
    return (req: Request, res: Response, next: NextFunction) => {
      next();
    };
  }
}

export function authorize(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (config.get(KnownConfigKey.ShouldAuthenticate) === "true") {
      if (!req.isAuthenticated()) {
        res.sendStatus(401);
        return;
      }
      const user = req.user as IUserCredential;
      if (!roles.find(r => user.roles.indexOf(r) >= 0)) {
        res.sendStatus(403);
        return;
      }
    }
    next();
  };
}
