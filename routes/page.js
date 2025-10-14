const express = require("express");
const router = express.Router();

const {
  getPages,
  getPage,
  createPage,
  updatePage,
  featurePage,
  deletePage,
} = require("../controllers/page");

const { isValidUser, isAdmin } = require("../middleware/auth");

// GET /pages
router.get("/", async (req, res) => {
  try {
    const radical = req.query.radical;
    const pinyin = req.query.pinyin;
    const sort = req.query.sort;
    const featured = req.query.featured;
    const pages = await getPages(radical, pinyin, sort, featured);
    res.status(200).send(pages);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// GET /pages/:hanzi
router.get("/:hanzi", async (req, res) => {
  try {
    const hanzi = req.params.hanzi;
    const page = await getPage(hanzi);
    console.log(page);
    res.status(200).send(page);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// POST /pages
router.post("/", isValidUser, async (req, res) => {
  try {
    const hanzi = req.body.hanzi;
    const pinyin = req.body.pinyin;
    const radical = req.body.radical;
    const traditional = req.body.traditional;
    const parts = req.body.parts;
    const image = req.body.image;

    if (!hanzi || !pinyin || !radical || !traditional || !parts) {
      return res.status(400).send({ message: "You're missing something." });
    }

    const newPage = await createPage(
      hanzi,
      pinyin,
      radical,
      traditional,
      parts,
      image
    );

    await res.status(200).send(newPage);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// PUT /pages/:hanzi
router.put("/:hanzi", isValidUser, async (req, res) => {
  try {
    const hanzi = req.params.hanzi;
    const pinyin = req.body.pinyin;
    const radical = req.body.radical;
    const traditional = req.body.traditional;
    const parts = req.body.parts;
    const image = req.body.image;

    if (!hanzi || !pinyin || !radical || !traditional || !parts) {
      return res.status(400).send({ message: "You're missing something." });
    }

    const updatedPage = await updatePage(
      hanzi,
      pinyin,
      radical,
      traditional,
      parts,
      image
    );

    await res.status(200).send(updatedPage);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

router.put("/feature/:hanzi", isAdmin, async (req, res) => {
  try {
    const hanzi = req.params.hanzi;
    const featured = req.body.featured;
    const updatedPage = await featurePage(hanzi, featured);

    await res.status(200).send(updatedPage);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;

// DELETE /pages/:hanzi
router.delete("/:hanzi", isValidUser, async (req, res) => {
  try {
    const hanzi = req.params.hanzi;
    await deletePage(hanzi);

    res.status(200).send({ message: `Page ${hanzi} has been deleted.` });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error." });
  }
});
