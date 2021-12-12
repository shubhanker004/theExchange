const mongoose = require('mongoose');
const httpStatus = require('http-status');

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleError = (err, res) => {
  const { message, statusCode } = err;
  res.status(statusCode).json({
    status: 'error',
    message,
    statusCode
  });
}

const otherErrors = (err, req, res, next) => {
  let error = err;
  if(! (error instanceof HttpError)) {
    const statusCode = error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || http[statusCode];
    error = new HttpError(message, statusCode);
  }

  next(error);
}

module.exports = { HttpError, handleError, otherErrors };