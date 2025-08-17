import { Router } from "express";
import { DonationRouter } from "./dontation/DonationRouter";
import { CategoryRouter } from "./category/CategoryRouter";

export class AppRouter {
  static router(): Router {
    const router = Router();

    router.use("/api/v1/donations", DonationRouter.router());
    router.use("/api/v1/categories", CategoryRouter.router());

    return router;
  }
}
