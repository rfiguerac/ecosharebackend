// src/infrastructure/repositories/ChatRepository.impl.ts
import { ChatRepository, ChatDataSource, Chat } from "../../domain";
import { CreateChatDto } from "../../domain/dtos/chat/CreateChatDto";

export class ChatRepositoryImpl implements ChatRepository {
  constructor(private dataSource: ChatDataSource) {}

  async getChatById(chatId: number): Promise<Chat> {
    return this.dataSource.getChatById(chatId);
  }

  async getAllChats(): Promise<Chat[]> {
    return this.dataSource.getAllChats();
  }

  async create(dto: CreateChatDto): Promise<Chat> {
    return this.dataSource.create(dto);
  }
}
