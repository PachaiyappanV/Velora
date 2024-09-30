require("dotenv").config();
require("express-async-errors");

//express
const express = require("express");
const app = express();

//rest of the packages
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

//database
const connectDB = require("./config/dbconnect");
const connectCloudinary = require("./config/cloudinary");

//routers
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");

// middleware
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

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
