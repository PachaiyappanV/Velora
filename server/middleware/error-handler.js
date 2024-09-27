const {
  StatusCodes: { BAD_REQUEST, INTERNAL_SERVER_ERROR },
} = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  let customError = {
    statusCode: err.statusCode || INTERNAL_SERVER_ERROR,
    message: !err.statusCode
      ? "Something went wrong please try again later"
      : err.message,
  };
  if (err.name === "ValidationError") {
    customError.statusCode = BAD_REQUEST;
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = BAD_REQUEST;
  }
  if (err.name === "CastError") {
    customError.statusCode = BAD_REQUEST;
    customError.message = err.message;
  }

  res.status(customError.statusCode).json({
    status: customError.statusCode === INTERNAL_SERVER_ERROR ? "error" : "fail",
    message: customError.message,
  });
};

module.exports = errorHandlerMiddleware;
