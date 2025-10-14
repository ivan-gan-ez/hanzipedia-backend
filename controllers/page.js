const Page = require("../models/page");

const OpenCC = require("opencc-js");
const converter = OpenCC.Converter({ from: "t", to: "cn" });

// this function just finds the initial of pinyin to make the code look less messy
const getInitial = (pinyin) => {
  if (pinyin.match(/zh|ch|sh/g)) {
    return pinyin.slice(0, 2);
  } else {
    return pinyin.slice(0, 1);
  }
};

// get all pages
const getPages = async (radical, pinyin, sort, featured) => {
  let filter = {};
  let pinyinRegex = "";

  if (radical) {
    filter.radical = radical;
  }
  if (pinyin) {
    pinyinRegex = new RegExp(String.raw`^${pinyin}`, "g");
  }
  if (featured) {
    filter.featured = true;
  }

  return await Page.find(filter)
    .regex("pinyin", pinyinRegex)
    .sort(
      sort === "alphabetical"
        ? { pinyin: 1 }
        : sort === "updated"
        ? { updatedAt: -1 }
        : { _id: 1 }
    );
};

// get one specific page by hanzi
const getPage = async (hanzi) => {
  const page = await Page.findById(converter(hanzi));
  if (page) {
    return page;
  }
};

// add a page
const createPage = async (
  hanzi,
  pinyin,
  radical,
  traditional,
  parts,
  image
) => {
  const newPage = new Page({
    _id: hanzi,
    pinyin,
    radical,
    initial: getInitial(pinyin),
    traditional,
    parts,
    image,
  });

  await newPage.save();

  return newPage;
};

// update a page
const updatePage = async (
  hanzi,
  pinyin,
  radical,
  traditional,
  parts,
  image
) => {
  const updatedPage = await Page.findByIdAndUpdate(
    hanzi,
    { pinyin, radical, traditional, initial: getInitial(pinyin), parts, image },
    { new: true }
  );
};

// update a page
const featurePage = async (hanzi, featured) => {
  const updatedPage = await Page.findByIdAndUpdate(
    hanzi,
    { featured: featured },
    { new: true }
  );
};

// delete a page
const deletePage = async (hanzi) => {
  return await Page.findByIdAndDelete(hanzi);
};

module.exports = {
  getPages,
  getPage,
  createPage,
  updatePage,
  featurePage,
  deletePage,
};
