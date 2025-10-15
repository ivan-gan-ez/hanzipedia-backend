const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  getUsers,
  getUserbyId,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const { isValidUser, isAdmin } = require("../middleware/auth");

// GET /users
router.get("/", isAdmin, async (req, res) => {
  try {
    const search = req.query.search;
    const mode = req.query.mode;
    const role = req.query.role;
    const sort = req.query.sort;
    const users = await getUsers(search, mode, role, sort);
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// GET /users/:id
router.get("/:id", isValidUser, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserbyId(id);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// POST /users/signup
router.post("/signup", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const user = await signup(name, email, password);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// POST /users/login
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await login(email, password);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// POST /users/
router.post("/", isAdmin, async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const user = await addUser(name, email, password);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// PUT /users/:id
router.put("/:id", isValidUser, async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const role = req.body.role;
    const numberOfEdits = req.body.numberOfEdits;
    const pfp = req.body.pfp;
    const user = await updateUser(id, name, role, numberOfEdits, pfp);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// DELETE /users/:id
router.delete("/:id", isValidUser, async (req, res) => {
  try {
    const id = req.params.id;
    await deleteUser(id);

    res.status(200).send({ message: `User ${id} has been deleted.` });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error." });
  }
});

module.exports = router;
