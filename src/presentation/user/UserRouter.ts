import { Router } from "express";

export class UserRouter {
  public static router(): Router {
    const router = Router();

    router.post("/login");

    return router;
  }
}
