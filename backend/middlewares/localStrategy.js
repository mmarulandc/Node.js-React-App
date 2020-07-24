const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const strategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password", // not necessary, DEFAULT
  },
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (!user.checkPassword(password, user.password )) {
        console.log("here")
        return done(null, false, { message: "Incorrect password" });
      }
      
      let userObject = user.toJSON()
      delete userObject.password;
      return done(null, userObject, {"Status": "ok"});
    });
  }
);

module.exports = strategy;
