// src/presentation/chat/ChatRouter.ts
import { Router } from "express";
import { ChatRepositoryImpl, ChatDataSourceImpl } from "../../infrastructure";
import { ChatController } from "./ChatController";
import { AuthMiddleware, validateDto } from "../../middleware";
import { CreateChatDto } from "../../domain/dtos/chat/CreateChatDto";

export class ChatRouter {
  public static router(): Router {
    const router = Router();
    const datasource = new ChatDataSourceImpl();
    const chatRepository = new ChatRepositoryImpl(datasource);
    const chatController = new ChatController(chatRepository);

    //router.use(AuthMiddleware.validateJWT);

    router.get("/", chatController.getAllChats);
    router.get("/:id", chatController.getChatById);
    router.post("/", validateDto(CreateChatDto), chatController.create);

    return router;
  }
}
