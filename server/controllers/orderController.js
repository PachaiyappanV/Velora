const Order = require("../models/Order");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const currency = "usd";
const deliveryCharge = 10;
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
  const { userId } = req.user;
  const { products, amount, address } = req.body;
  const { origin } = req.headers;
  const orderData = {
    userId,
    products,
    amount,
    address,
    paymentMethod: "Stripe",
    payment: false,
    date: Date.now(),
  };
  const order = await Order.create(orderData);

  const line_items = products.map((product) => {
    return {
      price_data: {
        currency,
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    };
  });
  line_items.push({
    price_data: {
      currency,
      product_data: {
        name: "Delivery Charges",
      },
      unit_amount: deliveryCharge * 100,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${origin}/verify?success=true&orderId=${order._id}`,
    cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
    line_items,
  });
  res.status(StatusCodes.OK).json({
    status: "success",
    session_url: session.url,
  });
};

//verify stripe
const verifyStripe = async (req, res) => {
  const { userId } = req.user;
  const { success, orderId } = req.body;

  if (success === "true") {
    await Order.findByIdAndUpdate(orderId, { payment: true });
    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.status(StatusCodes.OK).json({
      status: "success",
      message: "order placed successfully",
    });
  } else {
    await Order.findByIdAndDelete(orderId);
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "fail",
      message: "order cancelled",
    });
  }
};

const allOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      orders,
    },
  });
};

const userOrders = async (req, res) => {
  const { userId } = req.user;
  const orders = await Order.find({ userId });
  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      orders,
    },
  });
};

const updateStatus = async (req, res) => {
  const { orderId, status } = req.body;

  await Order.findByIdAndUpdate(orderId, { status });

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "order status updated successfully",
  });
};

module.exports = {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
};
