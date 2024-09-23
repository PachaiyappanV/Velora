require("dotenv").config();

//express
const express = require("express");
const app = express();

//rest of the packages
const cors = require("cors");
const morgan = require("morgan");

app.use(morgan("tiny"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
