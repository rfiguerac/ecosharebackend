import { Response, Request } from "express";

import { UploadedFile } from "express-fileupload";
import { UploadMulti } from "../../domain/use-case/fileUpload/UploadMulti";
import { ImagesDonationDataSourceImpl } from "../../infrastructure/datasources/ImagesDonationDataSource.impl";
import { ImagesDonationRepositoryImpl } from "../../infrastructure/repositories/ImagesDonationRepository";
import { AddImagesDonation } from "../../domain/use-case/donation/AddImagesDonation";

export class FileUploadController {
  // DI
  constructor() {}

  uploadFile = (req: Request, res: Response) => {
    const type = req.params.type;
    const file = req.body.files.at(0) as UploadedFile;
  };

  uploadMultipleFiles = async (req: Request, res: Response) => {
    // Paso 1: Acceder a los archivos desde req.body.files, según el middleware
    const files = req.body.files as UploadedFile[];
    // Subir imágenes
    const uploadedFileNames = await UploadMulti.execute(files);
    const imageUrl: string[] = uploadedFileNames;

    const donationId = Number(req.params.id);
    const imgDataSource = new ImagesDonationDataSourceImpl();
    const imdRepo = new ImagesDonationRepositoryImpl(imgDataSource);
    const addImagesDonation = new AddImagesDonation(imdRepo);

    await addImagesDonation.execute(imageUrl, donationId);

    res.status(201).json({ imageUrl });
  };
}
