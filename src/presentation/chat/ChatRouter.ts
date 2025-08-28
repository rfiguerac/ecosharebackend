import { Router } from "express";
import { ChatRepositoryImpl, ChatDataSourceImpl } from "../../infrastructure";
import { ChatController } from "./ChatController";

export class ChatRouter {
	public static router(): Router {
		const router = Router();
		const datasource = new ChatDataSourceImpl();
		const chatRepository = new ChatRepositoryImpl(datasource);
		const chatController = new ChatController(chatRepository);

		router.get("/", chatController.getAllChats);
		router.get("/:id", chatController.getChatById);

		return router;
	}
}
