const { body, validationResult } = require("express-validator");

const signupChecks = () => {
  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return [
    body("username", "Email is required"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .matches(passwordRegex)
      .withMessage(
        "Password with at least 8 characters, 1 special character and 1 uppercase character"
      ),
  ];
};

const loginChecks = () => {
  return [
    body("username", "Email is required"),
    body("password").notEmpty().withMessage("password is required"),
  ];
};

const newTaskChecks = () =>{
  return [
    body("creator").notEmpty().withMessage("Creator name is required"),
    body("taskName").notEmpty().withMessage("Task's name is required"),
    body("expectedDate").notEmpty().withMessage("Date is required").isDate().withMessage("Invalid date"),
    body("priority").notEmpty().withMessage("Priority is required")
  ]
};
const editTaskChecks = () =>{
  return [
    body("taskName").notEmpty().withMessage("Task's name is required"),
    body("expectedDate").notEmpty().withMessage("Date is required").isDate().withMessage("Invalid date"),
    body("priority").notEmpty().withMessage("Priority is required")
  ]
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

module.exports = { loginChecks, signupChecks, newTaskChecks, editTaskChecks, validate };
