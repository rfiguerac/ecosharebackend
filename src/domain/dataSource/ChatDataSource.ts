import { Chat } from "..";
import { CreateChatDto } from "../dtos/chat/CreateChatDto";

export abstract class ChatDataSource {
  abstract getAllChats(): Promise<Chat[]>;
  abstract getChatById(chatId: number): Promise<Chat>;
  abstract create(dto: CreateChatDto): Promise<Chat>;
}
