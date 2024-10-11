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
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/orderRoutes");

// middleware
const errorHandlerMiddleware = require("./middleware/error-handler");

//cors config
const allowedOrigins = [
  "http://localhost:5100",
  "http://localhost:5173",
  "https://e-commerce-app-three-kappa.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // If there is no origin (like for same-origin requests), allow it
      if (!origin) return callback(null, true);

      // Check if the incoming request's origin is in the allowed origins array
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // This is necessary to allow cookies
  })
);

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to E-Commerce API");
});
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

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
