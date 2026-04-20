import { z } from "zod";

// before createUser operation we need to validate it to create validation we need to console req.body.data
// and see which response will come. then that way we need to write validation

const createUser = z.object({
  password: z.string({
    message: "Password is required",
  }),
  user: z.object({
    name: z.string({
      message: "Name is required!",
    }),
    email: z.string({
      message: "Email is required!",
    }),
  }),
});

export const userValidation = {
  createUser,
};
