const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Libreria para codificación de la información del usuario en la base de datos

let TaskScheme = new Schema(
  {
    creator: { required: true, type: Schema.Types.ObjectId, ref: "Users" },
    taskName: { type: String, unique: false, lowercase: true, required: true },
    priority: { type: String, unique: false, lowercase: true, required: true },
    description: {
      type: String,
      unique: false,
      lowercase: true
    },
    expectedDate: { type: Date, unique: false, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Task", TaskScheme);
