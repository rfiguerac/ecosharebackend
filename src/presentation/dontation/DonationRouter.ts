import { Router } from "express";
import { DonationController } from "./DonationController";
import { DonationRepository } from "../../domain";
import { DonationDataSourceImpl, DonationRepositoryImpl } from "../../infrastructure";
import { FileUploadMiddleware, AuthMiddleware } from "../../middleware";

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
      AuthMiddleware.validateJWT,
      donationController.create
    );

    router.get("/:id", donationController.getById);
    router.get("/", donationController.list);
    router.put("/:id", AuthMiddleware.validateJWT, donationController.update);
    router.delete("/:id",  AuthMiddleware.validateJWT, donationController.delete);

    return router;
  }
}
