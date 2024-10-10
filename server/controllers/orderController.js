const Order = require("../models/Order");
const User = require("../models/User");

const placeOrder = async (req, res) => {
  const { userId } = req.user;
  const { products, amount, address } = req.body;

  const orderData = {
    userId,
    products,
    amount,
    address,
    paymentMethod: "cod",
    payment: false,
    date: Date.now(),
  };

  const order = await Order.create(orderData);
  await User.findByIdAndUpdate(userId, { cartData: {} });
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "order placed successfully",
  });
};

const placeOrderStripe = async (req, res) => {
  res.send("place order stripe");
};

const placeOrderRazorPay = async (req, res) => {
  res.send("place order RazorPay");
};

const allOrders = async (req, res) => {
  res.send("all orders");
};

const userOrders = async (req, res) => {
  res.send("user orders");
};

const updateStatus = async (req, res) => {
  res.send("update status");
};

module.exports = {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorPay,
  allOrders,
  userOrders,
  updateStatus,
};
