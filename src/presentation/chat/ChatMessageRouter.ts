import { Router } from "express";
import {
  ChatMessageRepositoryImpl,
  ChatMessageDataSourceImpl,
} from "../../infrastructure";
import { ChatMessageController } from "./ChatMessageController";
import { validateDto } from "../../middleware";
import { SendMessageDto } from "../../domain";

export class ChatMessageRouter {
  public static router(): Router {
    const router = Router();
    const datasource = new ChatMessageDataSourceImpl();
    const chatMessageRepository = new ChatMessageRepositoryImpl(datasource);
    const chatMessageController = new ChatMessageController(
      chatMessageRepository
    );

    router.get("/:id/messages", chatMessageController.getMessagesByChatId);
    router.post(
      "/send-message",
      validateDto(SendMessageDto),
      chatMessageController.sendMessage
    );

    return router;
  }
}
