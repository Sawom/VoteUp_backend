import { Role, User } from "@prisma/client";
import { IFile } from "../../interfaces/file";
import * as bcrypt from "bcrypt";
import { Request } from "express";
import prisma from "../../../shared/prisma";

const createUser = async (req: Request): Promise<User> => {
  // const file = req.file as IFile;

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
