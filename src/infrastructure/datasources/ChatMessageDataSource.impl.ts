import { prisma } from "../../data/postgresql";
import {
  ChatMessage,
  ChatMessageDataSource,
  SendMessageDto,
} from "../../domain";

export class ChatMessageDataSourceImpl implements ChatMessageDataSource {
  async getMessagesByChatId(chatId: number): Promise<ChatMessage[]> {
    const messages = await prisma.chatMessage.findMany({
      where: { chatId: Number(chatId) },
    });
    return messages.map((message) => ChatMessage.fromObject(message));
  }

  async sendMessage(dto: SendMessageDto): Promise<ChatMessage> {
    const message = await prisma.chatMessage.create({
      data: {
        message: dto.message,
        chatId: dto.chatId,
        senderId: dto.senderId,
        receiverId: dto.receiverId,
      },
    });
    return ChatMessage.fromObject(message);
  }
}
