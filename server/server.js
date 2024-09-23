require("dotenv").config();

//express
const express = require("express");
const app = express();

//database
const connectDB = require("./db/connect");

//rest of the packages
const cors = require("cors");
const morgan = require("morgan");
const { toDate } = require("validator");

app.use(morgan("tiny"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database connected successfully");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
