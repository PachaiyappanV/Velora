const express = require("express");
const router = express.Router();

const {
  placeOrder,
  placeOrderRazorPay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
} = require("../controllers/orderController");

const {
  authenticateUser,
  authenticateAdmin,
} = require("../middleware/authentication");

//Admin Routes
router.get("/list", authenticateAdmin, allOrders);
router.patch("/status", authenticateAdmin, updateStatus);

//Payment Routes
router.post("/place", authenticateUser, placeOrder);
router.post("/razorpay", authenticateUser, placeOrderRazorPay);
router.post("/stripe", authenticateUser, placeOrderStripe);

//User Routes
router.get("/userOrders", authenticateUser, userOrders);
module.exports = router;
