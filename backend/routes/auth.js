const express = require("express");
const localStategy = require("../middlewares/localStrategy");
const Stategy = require("../middlewares/jwtStrategy");
const passport = require("passport")


const { signupChecks, loginChecks, validate } = require("../utils/validations");

const router = express.Router();

const signup = require("../controllers/signup");
const login = require("../controllers/login");
passport.use(localStategy)
router.post("/signup", signupChecks(), validate, signup);
router.post("/login", login);

// router.post("/login", login);

module.exports = { router, passport};
