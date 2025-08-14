import { Router } from "express";
import { DonationRouter } from "./dontation/DonationRouter";

export class AppRouter {
  static router(): Router {
    const router = Router();

    router.use("/api/v1/donations", DonationRouter.router());

    return router;
  }
}
