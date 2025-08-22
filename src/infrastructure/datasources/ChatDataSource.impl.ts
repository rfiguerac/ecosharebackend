import { prisma } from "../../data/postgresql";
import { HttpException } from "../../presentation/errors/httpException";
import {
	Chat,
	ChatDataSource,
	CreateMessageDto,
    User,
} from "../../domain";

export class ChatDataSourceImpl implements ChatDataSource {
    async getChatById(chatId: number): Promise<Chat> {
        const chat = await prisma.chat.findUnique({
            where: { id: chatId },
        });
        if (!chat) {
            throw new HttpException(404, "Chat not found");
        }
        return Chat.fromObject(chat);
    }

    async addMessage(dto: CreateMessageDto): Promise<void> {
        const chat = await prisma.chat.findUnique({
            where: { id: dto.senderId },
        });
        if (!chat) {
            throw new HttpException(404, "Chat not found");
        }
        await prisma.chat.create({
            data: {
                content: dto.content,
                senderId: dto.senderId,
            },
        });
    }
}
