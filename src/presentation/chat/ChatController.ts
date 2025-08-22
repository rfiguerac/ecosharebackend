import { Request, Response } from "express";
import { ChatRepository, GetChatById, AddMessage } from "../../domain";

export class ChatController {
	constructor(private readonly userRepository: ChatRepository) {}

	getChatById = async (req: Request, res: Response) => {
		try {
			const chat = await new GetChatById(this.userRepository).execute(
				Number(req.params.id)
			);
			if (!chat) {
				return res.status(404).json({ message: "Chat not found" });
			}
			res.status(200).json(chat.toResponse());
		} catch (error) {
			res.status(500).json({ message: "Internal server error" });
		}
	};

	addMessage = async (req: Request, res: Response) => {
		try {
			const chat = await new AddMessage(this.userRepository).execute(req.body);
			res.status(201).json(chat);
		} catch (error) {
			res.status(500).json({ message: "Internal server error" });
		}
	};
}
