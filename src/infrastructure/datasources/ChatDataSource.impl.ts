import { prisma } from "../../data/postgresql";
import {
	Chat,
	ChatDataSource,
} from "../../domain";

export class ChatDataSourceImpl implements ChatDataSource {
    async getChatById(chatId: number): Promise<Chat> {
        const chat = await prisma.chat.findFirst({
            where: { id: chatId },
            include: { chatMessages: true },
        });
        return Chat.fromObject(chat);
    }

    async getAllChats(): Promise<Chat[]> {
        const chats = await prisma.chat.findMany({
            include: { chatMessages: true },
        });
        return chats.map((chat) => Chat.fromObject(chat));
    }
}
