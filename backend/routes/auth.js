const express = require("express");
const localStategy = require("../middlewares/localStrategy");
const passport = require("passport")
const router = express.Router();
const signup = require("../controllers/signup");
const login = require("../controllers/login");
const { signupChecks, validate } = require("../utils/validations");


passport.use(localStategy)
router.post("/signup", signupChecks(), validate, signup);
router.post("/login", login);

module.exports = { router, passport};
