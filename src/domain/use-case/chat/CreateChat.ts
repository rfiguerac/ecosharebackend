// src/domain/use-case/chat/CreateChat.ts

import { CreateChatDto } from "../../dtos/chat/CreateChatDto";
import { Chat } from "../../entities/Chat";
import { ChatRepository } from "../../repositories/chat/ChatRepository";

export class CreateChat {
  constructor(public repository: ChatRepository) {}

  async execute(dto: CreateChatDto): Promise<Chat> {
    return this.repository.create(dto);
  }
}
