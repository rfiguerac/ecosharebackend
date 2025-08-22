import { SendMessageDto, ChatMessage } from "../../";

export abstract class ChatMessageRepository {
    abstract sendMessage(dto: SendMessageDto): Promise<void>;
}