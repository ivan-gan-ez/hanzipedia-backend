require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// connect to mongodb with a mongoose
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL + "hanzipedia");
    console.log("Server connected!");
  } catch (error) {
    console.log(error);
  }
}

// trogger de function
connectToMongoDB();

app.get("/api", (req, res) => {
  res.send("Greetings and salutations!");
});

// import all the routers
app.use("/api/pages", require("./routes/page"));
app.use("/api/meanings", require("./routes/meaning"));
app.use("/api/users", require("./routes/user"));
app.use("/api/edits", require("./routes/edit"));
app.use("/api/image", require("./routes/image"));

//set up static path for the uploads folder
app.use("/api/uploads", express.static("uploads"));

app.listen(2357, () => {
  console.log("Server currently running at http://localhost:2357");
});
