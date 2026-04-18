import { User } from "@prisma/client";

const createAdmin = async (req: Request): Promise<User> => {
  return 0 as unknown as User;
};

export const userService = {
  createAdmin,
};
