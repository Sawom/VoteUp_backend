import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

/**
 * validateRequest: Middleware to validate the request body against a Zod schema.
 * If validation fails, it throws an error before hitting the controller.
 */
const validateRequest = (schema: ZodObject) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
