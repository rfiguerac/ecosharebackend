import { CreateMessageDto, Chat } from "..";

export abstract class ChatDataSource {
    abstract getChatById(chatId: number): Promise<Chat>;
    abstract addMessage(dto: CreateMessageDto): Promise<void>;
}