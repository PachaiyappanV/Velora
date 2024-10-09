const { isTokenValid } = require("../utils/jwt");
const UnauthenticatedError = require("../errors/unauthenticated");
const authenticateAdmin = (req, res, next) => {
  let token;
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  // check cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  try {
    const { email } = isTokenValid({ token });
    if (email !== process.env.ADMIN_EMAIL) {
      throw new UnauthenticatedError(
        "You are not authorized to access this route"
      );
    }
    next();
  } catch (err) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

const authenticateUser = (req, res, next) => {
  let token;
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  // check cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  try {
    const { email, userId, name } = isTokenValid({ token });
    req.user = { email, userId, name };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = { authenticateAdmin, authenticateUser };
