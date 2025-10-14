const { decode } = require("jsonwebtoken");
const Meaning = require("../models/meaning");

// get all meanings of a specific hanzi
const getMeanings = async () => {
  return await Meaning.find().sort({ updatedAt: 1 });
};

// get all meanings of a specific hanzi
const getMeaningsOfHanzi = async (hanzi) => {
  const meanings = await Meaning.find({ character: hanzi }).sort({
    updatedAt: 1,
  });
  if (meanings) {
    return meanings;
  }
};

// get one specific meaning by id
const getMeaningById = async (id) => {
  return await Meaning.findOne({ _id: id });
};

// add a meaning
const createMeaning = async (
  character,
  pinyin,
  type,
  meaning,
  exampleSentences
) => {
  const newMeaning = new Meaning({
    character,
    pinyin,
    type,
    meaning,
    exampleSentences,
  });

  await newMeaning.save();
  return newMeaning;
};

// update a meaning
const updateMeaning = async (
  id,
  character,
  pinyin,
  type,
  meaning,
  exampleSentences
) => {
  const updatedPage = await Meaning.findByIdAndUpdate(
    id,
    { character, pinyin, type, meaning, exampleSentences },
    { new: true }
  );
};

// delete a meaning
const deleteMeaning = async (id) => {
  return await Meaning.findByIdAndDelete(id);
};

// delete a meaning
const deleteMeaningsOfHanzi = async (hanzi) => {
  return await Meaning.deleteMany({ character: hanzi });
};

module.exports = {
  getMeanings,
  getMeaningsOfHanzi,
  getMeaningById,
  createMeaning,
  updateMeaning,
  deleteMeaning,
  deleteMeaningsOfHanzi,
};
