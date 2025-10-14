const express = require("express");
const router = express.Router();

const {
  getMeanings,
  createMeaning,
  getMeaningsOfHanzi,
  getMeaningById,
  updateMeaning,
  deleteMeaning,
  deleteMeaningsOfHanzi,
} = require("../controllers/meaning");

const { isValidUser, isAdmin } = require("../middleware/auth");

// GET /meanings
router.get("/", async (req, res) => {
  try {
    const pages = await getMeanings();
    res.status(200).send(pages);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// GET /meanings/:id
router.get("/:id", isValidUser, async (req, res) => {
  try {
    const id = req.params.id;
    if (Array.from(id).length === 1) {
      const meanings = await getMeaningsOfHanzi(id);
      res.status(200).send(meanings);
    } else {
      const meanings = await getMeaningById(id);
      res.status(200).send(meanings);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// POST /meanings
router.post("/", isValidUser, async (req, res) => {
  try {
    const character = req.body.character;
    const pinyin = req.body.pinyin;
    const type = req.body.type;
    const meaning = req.body.meaning;
    const exampleSentences = req.body.exampleSentences;

    if (!character || !pinyin || !type || !meaning) {
      return res.status(400).send({ message: "You're missing something." });
    }

    const newMeaning = await createMeaning(
      character,
      pinyin,
      type,
      meaning,
      exampleSentences
    );

    await res.status(200).send(newMeaning);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// PUT /meanings/:id
router.put("/:id", isValidUser, async (req, res) => {
  try {
    const id = req.params.id;
    const character = req.body.character;
    const pinyin = req.body.pinyin;
    const type = req.body.type;
    const meaning = req.body.meaning;
    const exampleSentences = req.body.exampleSentences;

    if (!character || !pinyin || !type || !meaning) {
      return res.status(400).send({ message: "You're missing something." });
    }

    const newMeaning = await updateMeaning(
      id,
      character,
      pinyin,
      type,
      meaning,
      exampleSentences
    );

    await res.status(200).send(newMeaning);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// DELETE /meanings/:id
router.delete("/:id", isValidUser, async (req, res) => {
  try {
    const id = req.params.id;
    if (Array.from(id).length === 1) {
      await deleteMeaningsOfHanzi(id);
      res
        .status(200)
        .send({ message: `Meanings of hanzi ${id} have been deleted.` });
    } else {
      await deleteMeaning(id);
      res.status(200).send({ message: `Meaning ${id} has been deleted.` });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error." });
  }
});

module.exports = router;
