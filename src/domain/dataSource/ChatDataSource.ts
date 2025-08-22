import { CreateMessageDto, Chat } from "..";

export abstract class ChatDataSource {
    abstract getChatByUserId(chatId: number): Promise<Chat>;
    abstract addMessage(dto: CreateMessageDto): Promise<void>;
}