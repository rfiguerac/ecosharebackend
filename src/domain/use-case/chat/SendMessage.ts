import { ChatMessageRepository, SendMessageDto } from "../..";

export class SendMessage {
    constructor(public repository: ChatMessageRepository) {}
    
    async execute(dto: SendMessageDto): Promise<void> {
        return this.repository.sendMessage(dto);
    }
}