import { Router } from "express";
import { ChatRepositoryImpl, ChatDataSourceImpl } from "../../infrastructure";
import { ChatController } from "./ChatController";

export class ChatRouter {
	public static router(): Router {
		const router = Router();
		const datasource = new ChatDataSourceImpl();
		const chatRepository = new ChatRepositoryImpl(datasource);
		const chatController = new ChatController(chatRepository);

		router.get("/:id", chatController.getChatById);
		router.get("/my-chats", chatController.getAllChats);

		return router;
	}
}
