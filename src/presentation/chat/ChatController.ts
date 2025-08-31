// src/presentation/chat/ChatController.ts
import { Request, Response, NextFunction } from "express";
import { ChatRepository, GetChatById, GetAllChats } from "../../domain";
import { HttpException } from "../errors/httpException";
import { CreateChatDto } from "../../domain/dtos/chat/CreateChatDto";
import { CreateChat } from "../../domain/use-case/chat/CreateChat";

export class ChatController {
  constructor(private readonly chatRepository: ChatRepository) {}

  getChatById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chat = await new GetChatById(this.chatRepository).execute(
        Number(req.params.id)
      );
      res.status(200).json(chat.toResponse());
    } catch (error) {
      next(error);
    }
  };

  getAllChats = async (req: Request, res: Response) => {
    try {
      const chats = await new GetAllChats(this.chatRepository).execute();
      res.status(200).json(chats.map((chat) => chat.toResponse()));
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createChatDto = req.body as CreateChatDto;
      const chat = await new CreateChat(this.chatRepository).execute(
        createChatDto
      );
      res.status(201).json(chat.toResponse());
    } catch (error) {
      next(error);
    }
  };
}
