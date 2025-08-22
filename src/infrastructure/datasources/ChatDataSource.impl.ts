import { prisma } from "../../data/postgresql";
import { HttpException } from "../../presentation/errors/httpException";
import {
	Chat,
	ChatDataSource,
	CreateMessageDto,
} from "../../domain";

export class ChatDataSourceImpl implements ChatDataSource {
    async getChatByUserId(chatId: number): Promise<Chat> {
        const chat = await prisma.chat.findFirst({
            where: { id: chatId },
            include: { user: true },
        });
        return Chat.fromObject(chat);
    }

    async addMessage(dto: CreateMessageDto): Promise<void> {
        await prisma.chat.create({
            data: {
                content: dto.content,
                userId: dto.userId,
            },
        });
    }
}
