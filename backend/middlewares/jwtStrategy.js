const passportJWT = require("passport-jwt");
const KEYS = require("../utils/keys");
const passport = require("passport");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const strategy = new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("Bearer"),
  secretOrKey: KEYS.JWT_SECRET_KEY,
},
(payload, next) =>{
  let user = payload;
  return next(null, user);
});

passport.use(strategy);

module.exports = passport;
