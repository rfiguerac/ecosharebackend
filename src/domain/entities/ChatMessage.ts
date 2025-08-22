export class ChatMessage {
	constructor(
		public id: number,
        public message: string,
        public chatId: number,
        public senderId: number,
        public receiverId: string,
		public createdAt?: Date,
		public updatedAt?: Date
	) {}

	public static fromObject(userData: any): ChatMessage {
		return new ChatMessage(
			userData.id,
			userData.message,
            userData.chatId,
            userData.senderId,
            userData.receiverId,
			userData.createdAt,
			userData.updatedAt
		);
	}

	public toResponse() {
		return {
			id: this.id,
            message: this.message,
            chatId: this.chatId,
            senderId: this.senderId,
            receiverId: this.receiverId,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}
