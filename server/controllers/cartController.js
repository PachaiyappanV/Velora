const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const addToCart = async (req, res) => {
  const { userId } = req.user;
  const { productId, size } = req.body;

  if (!productId || !size) {
    throw new BadRequestError("Please provide product id and size");
  }

  const userData = await User.findById(userId);
  let cartData = await userData.cartData;

  if (cartData[productId]) {
    if (cartData[productId][size]) {
      cartData[productId][size] += 1;
    } else {
      cartData[productId][size] = 1;
    }
  } else {
    cartData[productId] = {};
    cartData[productId][size] = 1;
  }

  await User.findByIdAndUpdate(userId, { cartData });

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "product added to cart successfully",
  });
};

const updateCart = async (req, res) => {
  const { userId } = req.user;
  const { productId, size, quantity } = req.body;

  if (!productId || !size || !quantity) {
    throw new BadRequestError("Please provide product id, size and quantity");
  }

  const userData = await User.findById(userId);
  let cartData = await userData.cartData;

  cartData[productId][size] = quantity;

  await User.findByIdAndUpdate(userId, { cartData });

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "cart updated successfully",
  });
};

const getUserCart = async (req, res) => {
  const { userId } = req.user;
  const userData = await User.findById(userId);
  const cartData = await userData.cartData;
  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      cartData,
    },
  });
};

module.exports = {
  addToCart,
  updateCart,
  getUserCart,
};
