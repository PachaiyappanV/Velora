const { isTokenValid } = require("../utils/jwt");
const UnauthenticatedError = require("../errors/unauthenticated");
const authenticateAdmin = (req, res, next) => {
  const token = req.cookies.token + "l";
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

module.exports = { authenticateAdmin };
