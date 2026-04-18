import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import { userService } from "./user.service";
import httpStatus from "http-status";

const createUser = async (req: Request, res: Response) => {
  const result = await userService.createUser(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Has Created successfully!",
    data: result,
  });
};

export const userController = {
  createUser,
};
