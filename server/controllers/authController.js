const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
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
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, tokenUser });
  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      user: tokenUser,
    },
  });
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const tokenUser = { email: process.env.ADMIN_EMAIL };
    attachCookiesToResponse({ res, tokenUser });
    res.status(StatusCodes.OK).json({
      status: "success",
      data: {
        admin: tokenUser,
      },
    });
  } else {
    throw new UnauthenticatedError("Invalid Credentials");
  }
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ message: "logged out" });
};

module.exports = { register, login, adminLogin, logout };
