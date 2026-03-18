import { ErrorRequestHandler } from "express";

/**
 * Global Error Handler: The final destination for all errors caught by catchAsync.
 * It prevents the server from crashing and sends a JSON error message to the client.
 */
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
