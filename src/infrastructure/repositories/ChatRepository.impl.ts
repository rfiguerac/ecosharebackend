import {
	CreateMessageDto,
	ChatRepository,
	ChatDataSource,
	Chat
} from "../../domain";

export class ChatRepositoryImpl implements ChatRepository {
	constructor(private dataSource: ChatDataSource) {}

	async getChatById(chatId: number): Promise<Chat> {
		return this.dataSource.getChatByUserId(chatId);
	}

	async addMessage(dto: CreateMessageDto): Promise<void> {
		await this.dataSource.addMessage(dto);
	}
}
