const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Libreria para codificación de la información del usuario en la base de datos

const Task = new Schema(
  {
    creator: { required: true, type: Schema.Types.ObjectId, ref: "Users" },
    title: { type: String, unique: false, lowercase: true, required: true },
    content: { type: String, unique: false, lowercase: true, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
PostSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Task", PostSchema);
