"use strict";
import passport from "passport";
import User from "../entity/user.entity.js";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { ACCESS_TOKEN_SECRET } from "../config/configEnv.js";
import { AppDataSource } from "../config/configDb.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ACCESS_TOKEN_SECRET,
};

// Estrategia para el usuario
passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      if (!jwt_payload.email) {
        return done(null, false, { message: "Email no presente en el token." });
      }
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: {
          email: jwt_payload.email,
        },
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Usuario no encontrado." });
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export function passportJwtSetup() {
  passport.initialize();
}

