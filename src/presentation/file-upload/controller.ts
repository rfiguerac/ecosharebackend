// src/presentation/file-upload/controller.ts

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

    // Guardar los registros de imagen en la base de datos y obtener las entidades creadas
    const createdImages = await addImagesDonation.execute(imageUrl, donationId);

    // Enviar las entidades de imagen como respuesta
    res.status(201).json({ images: createdImages });
  };
}
