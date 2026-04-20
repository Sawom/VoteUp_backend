import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";
import { ICloudinaryResponse, IFile } from "../app/interfaces/file";
import fs from "fs";
import multer from "multer";
import path from "path";
import config from "../config/index";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// create a uploads folder on root.
// if folder does not exists then create it when server is start to avoid *ENOENT* error
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (
  file: IFile,
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      {
        folder: "vote_up_project",
        use_filename: true,
      },

      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined,
      ) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result as unknown as ICloudinaryResponse);
        }
      },
    );
  });
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
