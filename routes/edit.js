const express = require("express");
const router = express.Router();

const { createEdit, getEdits } = require("../controllers/edit");
const { isValidUser, isAdmin } = require("../middleware/auth");

// GET /edits
router.get("/", isValidUser, async (req, res) => {
  try {
    const page = req.query.page;
    const user = req.query.user;
    const edits = await getEdits(page, user);
    res.status(200).send(edits);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// POST /edits
router.post("/", isValidUser, async (req, res) => {
  try {
    const user = req.body.user;
    const page = req.body.page;
    const desc = req.body.desc;

    const edit = await createEdit(user, page, desc);
    res.status(200).send(edit);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
