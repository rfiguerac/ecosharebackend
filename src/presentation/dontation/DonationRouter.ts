import { Router } from "express";
import { DonationController } from "./DonationController";
import { validateDto } from "../../middleware/validateDto.middleware";
import { DonationRepository } from "../../domain";
import {
  DonationDataSourceImpl,
  DonationRepositoryImpl,
} from "../../infrastructure";
import multer from "multer";

// Configuración de Multer para guardar en disco
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Guarda los archivos en esta carpeta
    cb(null, "public/uploads/donations");
  },
  filename: function (req, file, cb) {
    // Nombre del archivo: marca de tiempo + nombre original del archivo
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export class DonationRouter {
  static router(): Router {
    const router = Router();
    const datasource = new DonationDataSourceImpl();
    const donationRepository: DonationRepository = new DonationRepositoryImpl(
      datasource
    );
    const donationController = new DonationController(donationRepository);

    // Ruta corregida: Usa el middleware de Multer y luego el controlador
    router.post("/", upload.array("images", 5), donationController.create);

    router.get("/:id", donationController.getById);
    router.get("/", donationController.list);
    router.put("/:id", donationController.update);
    router.delete("/:id", donationController.delete);

    return router;
  }
}
