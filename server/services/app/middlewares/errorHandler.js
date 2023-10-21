function errorHandler(err, req, res, next) {
  console.log(err);
  let status = 500;
  let message = "Internal server error";
  if (
    err.name === "SequelizeUniqueConstraintError" ||
    err.name === "SequelizeValidationError"
  ) {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name === "email/password_required") {
    status = 400;
    message = "Email/Password is required";
  } else if (err.name === "invalid_email/password") {
    status = 401;
    message = "Invalid email or password";
  } else if (
    err.name === "unauthenticated" ||
    err.name === "JsonWebTokenError"
  ) {
    status = 401;
    message = "Invalid token";
  } else if (err.name === "item_not_found") {
    status = 404;
    message = "Item Not Found";
  }
  res.status(status).json({ message });
}

module.exports = errorHandler;
