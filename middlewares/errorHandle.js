const ErrorResponse = require("../utils/ErrorResponse");

const errorHandle = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  error.name = err.name;
  console.log(err.stack);

  if (error.name === "CastError") {
    error = new ErrorResponse(`Invalid ${error.path}: ${error.value}`, 400);
  }

  if (error.code === 11000) {
    error = new ErrorResponse(`Duplicate value`, 400);
  }

  if (error.name === "ValidationError") {
    const message = Object.values(err.errors).map((e) => e.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "Server error",
  });
};

module.exports = errorHandle;
