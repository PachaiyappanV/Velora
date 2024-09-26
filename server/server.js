require("dotenv").config();

//express
const express = require("express");
const app = express();

//rest of the packages
const cors = require("cors");
const morgan = require("morgan");

//database
const connectDB = require("./config/dbconnect");
const connectCloudinary = require("./config/cloudinary");

// middleware
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database connected successfully");
    await connectCloudinary();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
