class erroHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMidleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new erroHandler(message, 400);
  }

  if (err.name === "JasonWebTokenError") {
    err.message = "Json Web Token is Invalid, Try Again";
    err = new erroHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    err.message = "Json Web Token is Expired, Try Again";
    err = new erroHandler(message, 400);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(", ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default erroHandler;
