import { ChatRepository, CreateMessageDto } from "../..";

export class AddMessage {
    constructor(public repository: ChatRepository) {}
    
    async execute(dto: CreateMessageDto): Promise<void> {
        return this.repository.addMessage(dto);
    }
}