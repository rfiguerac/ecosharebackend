// src/presentation/chat/ChatMessageController.ts
import { Request, Response } from "express";
import {
  ChatMessageRepository,
  GetMessagesByChatId,
  SendMessage,
} from "../../domain";
export class ChatMessageController {
  constructor(private readonly userRepository: ChatMessageRepository) {}
  getMessagesByChatId = async (req: Request, res: Response) => {
    try {
      const chat = await new GetMessagesByChatId(this.userRepository).execute(
        Number(req.params.id)
      );
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  sendMessage = async (req: Request, res: Response) => {
    try {
      const createdMessage = await new SendMessage(this.userRepository).execute(
        req.body
      );
      res.status(201).json(createdMessage);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
