import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import { userService } from "./user.service";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { userFilterableFields } from "./user.constant";
import pick from "../../../shared/pick";
import { IAuthUser } from "../../interfaces/common";

const createUser = async (req: Request, res: Response) => {
  const result = await userService.createUser(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Has Created successfully!",
    data: result,
  });
};

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await userService.getAllUsers(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users fetched successfully!",
    meta: result.meta,
    data: result.data,
  });
});

// get user's own profile
const getUserOwnProfile = catchAsync(
  async (req: Request , res: Response) => {
    const { id } = req.params;
    const result = await userService.getUserOwnProfile({ id } as IAuthUser);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile data fetched!",
      data: result,
    });
  },
);

export const userController = {
  createUser,
  getAllUsers,
  getUserOwnProfile,
};
