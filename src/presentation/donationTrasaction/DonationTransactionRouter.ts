import { Router } from "express";
import { DonationTransactionDataSourceImpl } from "../../infrastructure/datasources/DonationTransactionDataSource.impl";
import { DonationTransactionRepositoryImpl } from "../../infrastructure/repositories/DonationTransactionRepository.impl";
import { DonationTransactionController } from "./DonationTransactionController";

export class DonationTransactionRouter {
  static router(): Router {
    const router = Router();
    const datasource = new DonationTransactionDataSourceImpl();
    const repository = new DonationTransactionRepositoryImpl(datasource);
    const controller = new DonationTransactionController(repository);

    router.post("/", controller.create);
    router.get("/:id", controller.getById);
    router.get("/", controller.getAll);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);

    return router;
  }
}
