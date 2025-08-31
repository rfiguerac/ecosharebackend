// src/domain/use-case/chat/SendMessage.ts

import { ChatMessageRepository, SendMessageDto, ChatMessage } from "../..";

export class SendMessage {
  constructor(public repository: ChatMessageRepository) {}

  async execute(dto: SendMessageDto): Promise<ChatMessage> {
    return this.repository.sendMessage(dto);
  }
}
