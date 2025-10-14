const jwt = require("jsonwebtoken");
const { getUserbyEmail } = require("../controllers/user");

// to check if the user calling the API is a valid user who has logged in
const isValidUser = async (req, res, next) => {
  try {
    // 0. extract token from authorisation header
    const { authorization = "" } = req.headers;

    // method 1 - .replace
    const token = authorization.replace("Bearer ", "");
    // method 2 - .split
    // const token = authorization.split(" ")[1];

    // 1. verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. get the user data by email
    const user = await getUserbyEmail(decoded.email);

    // 3. verify the user
    if (user) {
      // 4. add user data into request
      req.user = user;
      // 5. trigger the next function
      next();
    } else {
      // 6. trigger error if not user
      res.status(400).send({ error: "YOU SHALL NOT PASS" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "der er or" });
  }
};

// to check if the user is an admin or not

const isAdmin = async (req, res, next) => {
  try {
    // 0. extract token from authorisation header
    const { authorization = "" } = req.headers;

    // method 1 - .replace
    const token = authorization.replace("Bearer ", "");
    // method 2 - .split
    // const token = authorization.split(" ")[1];

    // 1. verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. get the user data by email
    const user = await getUserbyEmail(decoded.email);

    // 3. verify the user
    if (user && (user.role === "admin" || user.role === "owner")) {
      // 4. add user data into request
      req.user = user;
      // 5. trigger the next function
      next();
    } else {
      // 6. trigger error if not admin
      res.status(400).send({ error: "YOU SHALL NOT PASS" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "der er or" });
  }
};

// to check if the user is an admin or not

const isOwner = async (req, res, next) => {
  try {
    // 0. extract token from authorisation header
    const { authorization = "" } = req.headers;

    // method 1 - .replace
    const token = authorization.replace("Bearer ", "");
    // method 2 - .split
    // const token = authorization.split(" ")[1];

    // 1. verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. get the user data by email
    const user = await getUserbyEmail(decoded.email);

    // 3. verify the user
    if (user && user.role === "owner") {
      // 4. add user data into request
      req.user = user;
      // 5. trigger the next function
      next();
    } else {
      // 6. trigger error if not admin
      res.status(400).send({ error: "YOU SHALL NOT PASS" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "der er or" });
  }
};

module.exports = {
  isValidUser,
  isAdmin,
  isOwner,
};
