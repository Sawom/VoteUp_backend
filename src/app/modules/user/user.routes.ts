import { Role } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { fileUploader } from "../../../helpars/fileUploader";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-user",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    
    // data parse and validation in body
    const parsedData = JSON.parse(req.body.data);
    req.body = userValidation.createUser.parse(parsedData);
    // we did it because at first response was in string format.
    // so we convert it to json data
    return userController.createUser(req, res);
  },
);

router.get("/", userController.getAllUsers);

export const userRoutes = router;
