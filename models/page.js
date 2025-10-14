const { Schema, model } = require("mongoose");

const pageSchema = new Schema(
  {
    _id: { type: String, required: true },
    pinyin: { type: String, required: true },
    initial: { type: String, required: true },
    radical: { type: String, required: true },
    traditional: { type: String, required: true },
    parts: { type: Array, required: true },
    image: { type: String, required: false },
    featured: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Page = model("Page", pageSchema);

module.exports = Page;
