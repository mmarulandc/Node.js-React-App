const User = require("../models/user");
const { validationResult } = require("express-validator");

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        info: {
          message: JSON.stringify(errors.array()),
        },
      });
    }
    let { username, password } = req.body;

    let isRegistered = await User.find({ username: username });
    if (isRegistered.length > 0) {
      return res.status(400).json({
        info: {
          message: "The email is already taken",
        },
      });
    }

    let newUser = new User({
      username: username,
      password: password,
    });
    await newUser.save();
    return res.status(200).json({
      info: {
        message: "The user has been registered sucsessfully",
      },
    });
  } catch (err) {
    res.status(500).json({
      info: {
        message:
          "Something wrong happened, try later",
      },
    });
    console.log(`Ha ocurrido un error ${err}`);
  }
};

module.exports = signup;
