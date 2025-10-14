const { Schema, model } = require("mongoose");

const meaningSchema = new Schema({
  character: { type: String, required: true },
  pinyin: { type: String, required: true },
  type: {
    type: String,
    enum: ["noun", "verb", "adjective", "other"],
    required: true,
  },
  meaning: { type: String, required: true },
  exampleSentences: { type: Array, required: false, default: [] },
});

const Meaning = model("Meaning", meaningSchema);

module.exports = Meaning;
