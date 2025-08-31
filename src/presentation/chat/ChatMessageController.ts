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
      // Modificado para que el caso de uso retorne el mensaje creado
      const createdMessage = await new SendMessage(this.userRepository).execute(
        req.body
      );
      // Devuelve el mensaje creado en la respuesta
      res.status(201).json(createdMessage);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
