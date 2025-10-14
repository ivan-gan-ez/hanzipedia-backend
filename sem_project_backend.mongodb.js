//create a database
use("hanzipedia");

//create a collection (folder)
db.createCollection("pages");
db.createCollection("users");
db.createCollection("edits");
db.createCollection("meanings");

// db.getCollection("meanings").insertOne({
//   _id: ObjectId("68e72b0fbbadfea7eb5312f2"),
//   character: "𫖮",
//   pinyin: "yi3",
//   type: "adjective",
//   meaning: "quiet",
//   exampleSentences: [],
//   __v: 0,
// });

// db.getCollection("pages").insertOne({
//   _id: "𫖮",
//   pinyin: "yi3",
//   initial: "y",
//   radical: "页",
//   traditional: "顗",
//   parts: ["岂", "页"],
//   featured: false,
//   __v: 0,
// });
