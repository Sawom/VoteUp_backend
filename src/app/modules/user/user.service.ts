import { Prisma, Role, User, Gender } from "@prisma/client";
import { IFile } from "../../interfaces/file";
import * as bcrypt from "bcrypt";
import { Request } from "express";
import prisma from "../../../shared/prisma";
import { fileUploader } from "../../../helpars/fileUploader";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { userSearchAbleFields } from "./user.constant";
import { IPaginationOptions } from "../../interfaces/pagination";

// create user
const createUser = async (req: Request): Promise<User> => {
  const file = req.file as IFile;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    // console.log(uploadToCloudinary); here we console to get CloudinaryResponse type
    req.body.user.profilePhoto = uploadToCloudinary?.secure_url; //secure_url provides img link and it is Cloudinary's property
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.user.email,
    name: req.body.user.name,
    password: hashedPassword,
    role: Role.USER,
    gender: req.body.user.gender as Gender,
    profilePhoto: req.body.user.profilePhoto || null,
  };

  const createUser = await prisma.user.create({
    data: userData,
  });

  return createUser;
};

// get all users
const getAllUsers = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const getUser = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      gender: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: getUser,
  };
};

export const userService = {
  createUser,
  getAllUsers,
};
