import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadMiddleware } from "../../middleware/file-upload.middleware";

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new FileUploadController();

    router.use(FileUploadMiddleware.containFiles);

    //router.post( '/single/:type', controller.uploadFile );
    router.post("/upload/:id", controller.uploadMultipleFiles);

    return router;
  }
}
