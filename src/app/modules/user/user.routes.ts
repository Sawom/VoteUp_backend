import { Role } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { fileUploader } from "../../../helpars/fileUploader";
import { userValidation } from "./user.validation";

const router = express.Router();

// create user
router.post(
  "/create-user",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    // data parse and validation in body
    const parsedData = JSON.parse(req.body.data);
    req.body = userValidation.createUser.parse(parsedData);
    // I did it because at first response was in string format. So I convert it to json data
    return userController.createUser(req, res);
  },
);

// get all users info
router.get("/", userController.getAllUsers);

// get users own profile
router.get("/:id", userController.getUserOwnProfile);

export const userRoutes = router;
