import {  Chat } from "..";

export abstract class ChatDataSource {
    abstract getAllChats(): Promise<Chat[]>;
    abstract getChatById(chatId: number): Promise<Chat>;
    // abstract addMessage(dto: CreateMessageDto): Promise<void>;
}