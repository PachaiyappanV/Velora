const express = require("express");
const router = express.Router();

const {
  addToCart,
  updateCart,
  getUserCart,
} = require("../controllers/cartController");

const { authenticateUser } = require("../middleware/authentication");

router
  .route("/")
  .post(authenticateUser, addToCart)
  .get(authenticateUser, getUserCart)
  .patch(authenticateUser, updateCart);

module.exports = router;
