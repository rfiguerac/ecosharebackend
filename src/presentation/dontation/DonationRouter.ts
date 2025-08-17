import { Router } from "express";
import { DonationController } from "./DonationController";
import { DonationRepository } from "../../domain";
import {
  DonationDataSourceImpl,
  DonationRepositoryImpl,
} from "../../infrastructure";
import multer from "multer";

//  Multer solo almacena en memoria
const upload = multer({ storage: multer.memoryStorage() });

export class DonationRouter {
  static router(): Router {
    const router = Router();
    const datasource = new DonationDataSourceImpl();
    const donationRepository: DonationRepository = new DonationRepositoryImpl(
      datasource
    );
    const donationController = new DonationController(donationRepository);

    router.post(
      "/",
      upload.array("images", 5), // Multer procesa la subida de archivos en memoria
      donationController.create
    );

    router.get("/:id", donationController.getById);
    router.get("/", donationController.list);
    router.put("/:id", donationController.update);
    router.delete("/:id", donationController.delete);

    return router;
  }
}
