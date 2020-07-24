const passportJWT = require("passport-jwt");
const KEYS = require("../utils/keys");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const strategy = new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
  secretOrKey: KEYS.JWT_SECRET_KEY,
},
(payload, next) =>{
  let user = payload;
  return next(null, user);
});

module.exports = strategy;
