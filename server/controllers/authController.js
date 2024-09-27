const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const createTokenUser = require("../utils/createTokenUser");
const { attachCookiesToResponse } = require("../utils/jwt");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  //create user
  const user = await User.create({ name, email, password });
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, tokenUser });
  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: {
      user: tokenUser,
    },
  });
};

const login = async (req, res) => {
  res.send("login");
};

const adminLogin = async (req, res) => {
  res.send("adminLogin");
};

module.exports = { register, login, adminLogin };
