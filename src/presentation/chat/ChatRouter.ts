import { Router } from "express";
import { ChatController } from "./ChatController";
import { validateDto } from "../../middleware";

export class ChatRouter {
	public static router(): Router {
		const router = Router();

		return router;
	}
}
