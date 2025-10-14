const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    numberOfEdits: { type: Number, required: true, default: 0 },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "owner"],
      default: "user",
    },
    pfp: { type: String },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
