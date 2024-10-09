const express = require("express");
const router = express.Router();

const {
  addToCart,
  updateCart,
  getUserCart,
} = require("../controllers/cartController");

router.route("/").post(addToCart).get(getUserCart).patch(updateCart);

module.exports = router;
