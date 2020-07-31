const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: { type: String, required: true, indexes: { unique: true } },
  password: { type: String, required: true },
});

UserSchema.methods = {
  checkPassword: (password, hashedPassword) => {

    return bcrypt.compareSync(password, hashedPassword);
  },
  hashPassword: (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

UserSchema.pre("save", function (next) {
  this.password = this.hashPassword(this.password);
  next();
});

module.exports = mongoose.model("Users", UserSchema);
