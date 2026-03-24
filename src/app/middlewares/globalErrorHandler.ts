import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
/**
 * Global Error Handler: The final destination for all errors caught by catchAsync.
 * It prevents the server from crashing and sends a JSON error message to the client.
 */
const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = err.message || "Something went wrong!";
    let error = err;

    res.status(statusCode).json({
        success,
        message,
        error
    })
};

export default globalErrorHandler;