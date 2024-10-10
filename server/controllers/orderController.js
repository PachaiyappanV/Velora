const placeOrder = async (req, res) => {
  res.send("place order");
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
