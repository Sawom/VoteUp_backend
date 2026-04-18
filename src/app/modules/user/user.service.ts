import { Role, User } from "@prisma/client";
import { IFile } from "../../interfaces/file";
import * as bcrypt from "bcrypt";
import { Request } from "express";
import prisma from "../../../shared/prisma";

const createUser = async (req: Request): Promise<User> => {
  // const file = req.file as IFile;

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.admin.email,
    name: req.body.name,
    password: hashedPassword,
    role: Role.USER,
  };

  const createUser = await prisma.user.create({
    data: userData,
  });

  return createUser;
};

export const userService = {
  createUser,
};
