import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { store } from "../store";
import config, { KnownConfigKey } from "../utils/config";
import { IUserCredential } from "../models";

export function initPassport() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (email, password, callback) => {
        const user = store.loadCredentials.find(
          u => u.email === email && u.password === password
        );

        if (user) callback(null, user, { message: "succeeded" });
        else callback(null, false, { message: "failed" });
      }
    )
  );

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.get(KnownConfigKey.JwtSecret, "JWT_SIGN_SECRET")
      },
      (jwtPayload: IUserCredential, callback) => callback(null, jwtPayload)
    )
  );
}
