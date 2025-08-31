import { Chat } from "../../";
import { CreateChatDto } from "../../dtos/chat/CreateChatDto";

export abstract class ChatRepository {
  abstract getChatById(chatId: number): Promise<Chat>;
  abstract getAllChats(): Promise<Chat[]>;
  abstract create(dto: CreateChatDto): Promise<Chat>;
}
