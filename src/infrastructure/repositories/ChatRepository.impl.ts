import {
	ChatRepository,
	ChatDataSource,
	Chat
} from "../../domain";

export class ChatRepositoryImpl implements ChatRepository {
	constructor(private dataSource: ChatDataSource) {}

	async getChatById(chatId: number): Promise<Chat> {
		return this.dataSource.getChatById(chatId);
	}

	async getAllChats(): Promise<Chat[]> {
		return this.dataSource.getAllChats();
	}

	// async addMessage(dto: CreateMessageDto): Promise<void> {
	// 	await this.dataSource.addMessage(dto);
	// }
}
