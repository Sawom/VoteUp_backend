import { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * catchAsync: This is a higher-order function that wraps my controller.
 * Logic: It catches any asynchronous errors and passes them to the 
 * global error handler, so I don't have to write try-catch everywhere.
 */
const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next)
        }
        catch (err) {
            next(err);
        }
    }
};

export default catchAsync;