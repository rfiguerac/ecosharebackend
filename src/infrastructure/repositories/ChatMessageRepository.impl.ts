import {
	ChatMessageRepository,
	ChatMessageDataSource,
	SendMessageDto,
    ChatMessage,
} from "../../domain";

export class ChatMessageRepositoryImpl implements ChatMessageRepository {
	constructor(private dataSource: ChatMessageDataSource) {}

    async getMessagesByChatId(chatId: number): Promise<ChatMessage[]> {
        return this.dataSource.getMessagesByChatId(chatId);
    }
	async sendMessage(dto: SendMessageDto): Promise<void> {
		await this.dataSource.sendMessage(dto);
	}
}
