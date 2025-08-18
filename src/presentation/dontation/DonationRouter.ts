import { Router } from "express";
import { DonationController } from "./DonationController";
import { DonationRepository } from "../../domain";
import {
  DonationDataSourceImpl,
  DonationRepositoryImpl,
} from "../../infrastructure";

import { FileUploadMiddleware } from "../../middleware/file-upload.middleware";

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
      FileUploadMiddleware.containFiles,
      donationController.create
    );

    router.get("/:id", donationController.getById);
    router.get("/", donationController.list);
    router.put("/:id", donationController.update);
    router.delete("/:id", donationController.delete);

    return router;
  }
}
