const AppError = require('../utils/appError');

const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401);
const handleJWTExpiredError = () => new AppError('Your token has expired! Please log in again.', 401);
const handleSequelizeUniqueError = (err) => {
  const message = err.errors?.[0]?.message || 'Duplicate field value';
  return new AppError(message, 400);
};
const handleSequelizeValidationError = (err) => {
  const messages = err.errors?.map(e => e.message).join('. ') || 'Invalid input data';
  return new AppError(messages, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error('ERROR:', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err, message: err.message };

    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();
    if (err.name === 'SequelizeUniqueConstraintError') error = handleSequelizeUniqueError(err);
    if (err.name === 'SequelizeValidationError') error = handleSequelizeValidationError(err);

    sendErrorProd(error, res);
  }
};
