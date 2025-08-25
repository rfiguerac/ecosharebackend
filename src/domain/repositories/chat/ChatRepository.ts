import { Chat } from "../../";

export abstract class ChatRepository {
    abstract getChatById(chatId: number): Promise<Chat>;
    abstract getAllChats(): Promise<Chat[]>;
}