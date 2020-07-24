const User = require("../models/user");
const { validationResult } = require("express-validator");

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    console.log("hasta ahora... funciona")
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        info: {
          message: JSON.stringify(errors.array())
        }        
      });
    }
    let { username, password } = req.body;

    let isRegistered = await User.find({ username: username });

    if (isRegistered) {
      return res.status(400).json({
        info: {
          message: "Ya hay un usuario registrado con este email",
        },
      });
    }
    //Se hashea la contraseña
    // password = Bcrypt.hashSync(password, 10);
    
    let newUser = new User({
      username: username,
      password: password,
      //   email: email
    });
    await newUser.save();
    return res.status(200).json({
      info: {
        message: "El usuario se ha registrado con exito",
      }
    });
  } catch (err) {
    res.status(500).json({
      info: {
        message:
          "Ha ocurrido un error al registrarse, por favor intentelo más tarde",
      },
    });
    console.log(`Ha ocurrido un error ${err}`);
  }
};

module.exports = signup;
