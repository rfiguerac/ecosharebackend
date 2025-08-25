import { ChatMessageRepository, ChatMessage } from "../..";

export class GetMessagesByChatId {
    constructor(public repository: ChatMessageRepository) {}
    
    async execute(chatId: number): Promise<ChatMessage[]> {
        return this.repository.getMessagesByChatId(chatId);
    }
}