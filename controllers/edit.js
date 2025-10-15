const Edit = require("../models/edit");
const User = require("../models/user");

// get all edits
const getEdits = async (page, user) => {
  let filter = {};

  if (page) {
    filter.page = page;
  }

  if (user) {
    filter.user = user;
  }

  return await Edit.find(filter).populate("user").sort({ time: -1 });
};

// get one specific edit by id
const getEditById = async (id) => {
  return await Edit.findOne({ _id: id });
};

// create an edit
const createEdit = async (user, page, desc) => {
  const newEdit = new Edit({
    user,
    page,
    desc,
    time: new Date(),
  });

  await newEdit.save();

  return newEdit;
};

module.exports = { getEdits, createEdit };
