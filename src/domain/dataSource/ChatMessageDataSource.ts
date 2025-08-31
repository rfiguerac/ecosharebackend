import { SendMessageDto, ChatMessage } from "..";

export abstract class ChatMessageDataSource {
  abstract getMessagesByChatId(chatId: number): Promise<ChatMessage[]>;
  abstract sendMessage(dto: SendMessageDto): Promise<ChatMessage>;
}
