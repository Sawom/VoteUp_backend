import { Role } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post(
  "/create-user",
  (req: Request, res: Response, next: NextFunction) => {
    return userController.createUser(req, res);
  },
);

export const userRoutes = router;
