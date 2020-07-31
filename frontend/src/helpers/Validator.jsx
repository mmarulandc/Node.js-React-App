import moment from "moment";

export default class Validator {
  constructor() {
    this.validateEmail = this.validateEmail.bind(this);
    this.validateSignupForm = this.validateSignupForm.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateExpectedDate = this.validateExpectedDate.bind(this);
    this.validateTaskName = this.validateTaskName.bind(this);
    this.validateDescription = this.validateDescription.bind(this);
    this.validateAddTaskModal = this.validateAddTaskModal.bind(this);
  }

  validateSignupForm(email, password) {
    let emailErrors = this.validateEmail(email);
    let passwordErrors = this.validatePassword(password);
    let errors = {
      email: emailErrors.email,
      password: passwordErrors.password,
    };
    return errors;
  }

  validateEmail(email) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errors = {
      email: "",
    };
    switch (true) {
      case email === "":
        errors.email = "Email is required";
        break;
      case !emailRegex.test(email):
        errors.email = "Enter a valid email";
        break;
      default:
        break;
    }
    return errors;
  }
  validatePassword(password) {
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    let errors = {
      password: "",
    };
    switch (true) {
      case password === "":
        errors.password = "Password is required";
        break;
      case !passwordRegex.test(password):
        errors.password =
          "Enter a secure password [A-Z] (>8)chars and ($%@!)char";
        break;
      default:
        break;
    }
    return errors;
  }

  validateTaskName(taskName) {
    let errors = {
      taskName: "",
    };
    let onlyAlphas = /^[a-zA-Z0-9 ]+$/;

    switch (true) {
      case taskName === "":
        errors.taskName = "The task's name is required";
        break;
      case !onlyAlphas.test(taskName):
        errors.taskName = "Only alphanums";
        break;
      default:
        break;
    }
    return errors;
  }
  validateExpectedDate(expectedDate) {
    let errors = {
      expectedDate: "",
    };
    if (moment(expectedDate).isBefore(moment().format(), "day")) {
      errors.expectedDate = "Selected date is before today";
    }
    return errors;
  }

  validateDescription(description) {
    let errors = {
      description: "",
    };
    let onlyAlphas = /^[a-zA-Z0-9,.!? ]*$/;
    if (description !== "") {
      if (!onlyAlphas.test(description)) {
        errors.description = "Only alphanums";
      }
    }
    return errors;
  }
  validateAddTaskModal(taskName, expectedDate, description) {
    let taskNameErrors = this.validateTaskName(taskName);
    let expectedDateErrors = this.validateExpectedDate(expectedDate);
    let descriptionErrors = this.validateDescription(description);
    const errors = {
      taskName: taskNameErrors.taskName,
      expectedDate: expectedDateErrors.expectedDate,
      description: descriptionErrors.description,
    };
    return errors;
  }
}
