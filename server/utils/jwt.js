const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, tokenUser }) => {
  const token = createJWT({ payload: tokenUser });
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  res.cookie("token", token, {
    expires: new Date(Date.now() + oneWeek),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
