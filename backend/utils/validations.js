const { body, validationResult } = require("express-validator");

const signupChecks = () => {
  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return [
    body("username", "El nombre de usuario es obligatorio"),
    body("password")
      .notEmpty()
      .withMessage("La contraseña es obligatoria")
      .matches(passwordRegex)
      .withMessage(
        "Por favor ingrese una contraseña que contenta al menos un caracter especial, y 8 caracteres"
      ),
  ];
};

const loginChecks = () => {
  return [
    body("username", "El nombre de usuario es obligatorio"),
    body("password").notEmpty().withMessage("La contraseña es obligatoria"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg))

  let errorMesssage = extractedErrors.join(", ")
  return res.status(422).json({
    info: {
      message: errorMesssage
    }
  });
};

module.exports = { loginChecks, signupChecks, validate };
