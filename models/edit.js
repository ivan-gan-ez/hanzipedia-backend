const { Schema, model } = require("mongoose");

const editSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  page: { type: String, required: true },
  desc: { type: String, default: "No description provided." },
  time: { type: Date, required: true },
});

const Edit = model("Edit", editSchema);

module.exports = Edit;
