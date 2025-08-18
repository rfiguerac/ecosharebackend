import { Router } from "express";

export class AuthRouter {
  public static router(): Router {
    const router = Router();

    router.post("/login");

    return router;
  }
}
