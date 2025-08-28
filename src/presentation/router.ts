import { Router } from "express";
import { DonationRouter } from "./dontation/DonationRouter";
import { CategoryRouter } from "./category/CategoryRouter";
import { UserRouter } from "./user/UserRouter";
import { ChatRouter } from "./chat/ChatRouter";
import { ChatMessageRouter } from "./chat/ChatMessageRouter";
import { AuthMiddleware } from "../middleware";
import { FileUploadRoutes } from "./file-upload/routes";
import { DonationTransactionRouter } from "./donationTrasaction/DonationTransactionRouter";

export class AppRouter {
	static router(): Router {
    const prefix = "/api/v1/"
    const router = Router();

		router.use(prefix + "/donations", DonationRouter.router());
		router.use(prefix + "/categories", CategoryRouter.router());
		router.use(prefix + "/users", UserRouter.router()); // NOTE: Add AuthMiddleware.validateJWT after development
		router.use(prefix + "/file", FileUploadRoutes.routes);
    router.use(
      prefix + "/donation-transactions",
      DonationTransactionRouter.router()
    ); // NOTE: Add AuthMiddleware.validateJWT after development
    router.use(prefix + "/chats", ChatRouter.router()); // NOTE: Add AuthMiddleware.validateJWT after development
    router.use(prefix + "/chat-messages", ChatMessageRouter.router()); // NOTE: Add AuthMiddleware.validateJWT after development

    return router;
  }
}
