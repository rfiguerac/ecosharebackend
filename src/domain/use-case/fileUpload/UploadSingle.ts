import { UploadedFile } from "express-fileupload";
import { HttpException } from "../../../presentation/errors/httpException";
import fs from "fs";
import path from "path";
import { Uuid } from "../../../config/uuid.adapter";

export class UploadSingleFile {
  private static checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      console.log(folderPath, "no existe, creando...");

      fs.mkdirSync(folderPath);
    }
  }

  static async execute(
    file: UploadedFile,
    validExtensions: string[] = ["png", "gif", "jpg", "jpeg"]
  ): Promise<string> {
    const uuid = Uuid.v4;
    try {
      const fileExtension = file.mimetype.split("/").at(1) ?? "";
      if (!validExtensions.includes(fileExtension)) {
        throw new HttpException(
          400,
          `Invalid extension: ${fileExtension}, valid ones ${validExtensions}`
        );
      }
      console.log(file);
      const destination = path.resolve(
        __dirname,
        "../../../../public/uploads/donation"
      );
      this.checkFolder(destination);

      const fileName = `${uuid()}.${fileExtension}`;

      file.mv(`${destination}/${fileName}`);
      return fileName;
    } catch (error) {
      throw new HttpException(500, "Error uploading file");
    }
  }
}
