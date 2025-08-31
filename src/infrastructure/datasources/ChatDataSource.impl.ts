// src/infrastructure/datasources/ChatDataSource.impl.ts
import { prisma } from "../../data/postgresql";
import { Chat, ChatDataSource } from "../../domain";
import { CreateChatDto } from "../../domain/dtos/chat/CreateChatDto";
import { HttpException } from "../../presentation/errors/httpException";

export class ChatDataSourceImpl implements ChatDataSource {
  async getChatById(chatId: number): Promise<Chat> {
    const chat = await prisma.chat.findFirst({
      where: { id: chatId },
      include: { chatMessages: true },
    });

    if (!chat) {
      throw new HttpException(404, "Chat not found");
    }

    return Chat.fromObject(chat);
  }

  async getAllChats(): Promise<Chat[]> {
    const chats = await prisma.chat.findMany({
      include: { chatMessages: true },
    });
    return chats.map((chat) => Chat.fromObject(chat));
  }

  async create(dto: CreateChatDto): Promise<Chat> {
    // Buscar si ya existe un chat entre los dos usuarios
    let chat = await prisma.chat.findFirst({
      where: {
        OR: [
          { userId: dto.userId, donorId: dto.donorId },
          { userId: dto.donorId, donorId: dto.userId },
        ],
      },
    });

    // Si no existe, crear uno nuevo
    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          userId: dto.userId,
          donorId: dto.donorId,
          lastMessage: "Start a conversation!",
          isRead: false,
        },
      });
    }

    return Chat.fromObject(chat);
  }
}
