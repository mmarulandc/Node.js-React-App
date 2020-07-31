const passport = require("passport");
const jwtStategy = require("../middlewares/jwtStrategy");

const KEYS = require("../utils/keys");
const jwt = require("jsonwebtoken");
const login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (error, user, info) => {
    if (user) {
      req.login(user, { session: false }, (error) => {
        if (error) {
          return res.status(400).json({
            info: {
              message: "Error al iniciar sesión",
            }
          });
        }
        const token = jwt.sign({
          username: user.username,
          id: user._id
        }, KEYS.JWT_SECRET_KEY, {
          expiresIn: 3600
        });
        return res.status(200).json({ user, token });
      });
    } else {
        return res.status(400).json({ info });
    }
  })(req, res);
};

module.exports = login;
