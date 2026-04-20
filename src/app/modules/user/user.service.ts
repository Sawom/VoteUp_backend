import { Role, User } from "@prisma/client";
import { IFile } from "../../interfaces/file";
import * as bcrypt from "bcrypt";
import { Request } from "express";
import prisma from "../../../shared/prisma";
import { fileUploader } from "../../../helpars/fileUploader";

const createUser = async (req: Request): Promise<User> => {
  const file = req.file as IFile;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    // console.log(uploadToCloudinary); here we console to get CloudinaryResponse type
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url; //secure_url provides img link and it is Cloudinary's property
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.email,
    name: req.body.name,
    password: hashedPassword,
    role: Role.USER,
  };

  const createUser = await prisma.user.create({
    data: userData,
  });

  return createUser;
};

const getAllUsers = async (params: any) => {
  const getUser = await prisma.user.findMany({
    where: params,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  return getUser;
};

export const userService = {
  createUser,
  getAllUsers,
};
