import { Router } from "express";
import { DonationRouter } from "./dontation/DonationRouter";
import { CategoryRouter } from "./category/CategoryRouter";
import { UserRouter } from "./user/UserRouter";
import { ChatRouter } from "./chat/ChatRouter";
import { AuthMiddleware } from "../middleware";
import { FileUploadRoutes } from "./file-upload/routes";

export class AppRouter {
  static router(): Router {
    const router = Router();
    
    router.use("/api/v1/donations", DonationRouter.router());
    router.use("/api/v1/categories", CategoryRouter.router());
    router.use("/api/v1/users", UserRouter.router()); // NOTE: Add AuthMiddleware.validateJWT after development
    router.use("/api/v1/file", FileUploadRoutes.routes);
    router.use("/api/v1/chats", ChatRouter.router()); // NOTE: Add AuthMiddleware.validateJWT after development

    return router;
  }
}
