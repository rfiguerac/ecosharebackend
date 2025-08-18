import { UploadedFile } from "express-fileupload";
import { UploadSingleFile } from "./UploadSingle";

export class UploadMulti {
  static async execute(files: UploadedFile[]): Promise<string[]> {
    const fileNames = await Promise.all(
      files.map((file) => UploadSingleFile.execute(file))
    );

    return Promise.resolve(fileNames);
  }
}
