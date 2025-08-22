import { ChatRepository, Chat } from "../..";

export class GetChatById {
    constructor(public repository: ChatRepository) {}
    
    async execute(chatId: number): Promise<Chat> {
        return this.repository.getChatById(chatId);
    }
}