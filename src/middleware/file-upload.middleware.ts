import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

export class FileUploadMiddleware {
  static containFiles(req: Request, res: Response, next: NextFunction) {
    // Si no hay archivos en la petición, retorna un error
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No se seleccionaron archivos" });
    }

    // `req.files` puede ser un solo objeto o un array, dependiendo de si se subió un solo archivo o varios
    // Lo convertimos a un array para manejar ambos casos de manera uniforme
    // Usamos `UploadedFile` para asegurar el tipado correcto
    let files: UploadedFile[] = [];
    if (Array.isArray(req.files)) {
      files = req.files;
    } else {
      // Obtenemos los valores del objeto req.files y los filtramos
      files = Object.values(req.files).flat() as UploadedFile[];
    }

    // Ahora `req.body.files` contiene un array de archivos
    req.body.files = files;

    // Continúa con el siguiente middleware o controlador
    next();
  }
}
