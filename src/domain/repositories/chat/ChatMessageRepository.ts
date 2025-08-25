import { SendMessageDto, ChatMessage } from "../../";

export abstract class ChatMessageRepository {
    abstract getMessagesByChatId(chatId: number): Promise<ChatMessage[]>;
    abstract sendMessage(dto: SendMessageDto): Promise<void>;
}