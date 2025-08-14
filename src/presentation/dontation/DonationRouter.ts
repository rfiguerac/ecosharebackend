import { Router } from "express";
import { DonationController } from "./DonationController";
import { validateDto } from "../../middleware/validateDto.middleware";
import { CreateDonationDto, DonationRepository } from "../../domain";
import {
  DonationDataSourceImpl,
  DonationRepositoryImpl,
} from "../../infrastructure";

export class DonationRouter {
  static router(): Router {
    const router = Router();

    const datasource = new DonationDataSourceImpl();
    const donationRepository: DonationRepository = new DonationRepositoryImpl(
      datasource
    );
    const donationController = new DonationController(donationRepository);

    router.post("/", validateDto(CreateDonationDto), donationController.create);
    router.get("/:id", donationController.getById);
    router.get("/", donationController.list);
    router.put("/:id", donationController.update);
    router.delete("/:id", donationController.delete);

    return router;
  }
}
