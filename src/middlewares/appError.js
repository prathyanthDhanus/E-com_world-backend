class AppError extends Error {
  constructor(ErrorMessage, Message, StatusCode) {
    super(Message);
    this.ErrorMessage = ErrorMessage;
    this.StatusCode = StatusCode;
    this.status = `${StatusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
