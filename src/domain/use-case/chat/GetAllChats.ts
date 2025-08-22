import { ChatRepository, Chat } from "../..";

export class GetAllChats {
    constructor(public repository: ChatRepository) {}
    
    async execute(): Promise<Chat[]> {
        return this.repository.getAllChats();
    }
}