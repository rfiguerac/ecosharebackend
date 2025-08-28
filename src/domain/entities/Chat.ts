export class Chat {
	constructor(
		public id: number,
		public userId: string,
		public isRead: boolean = false,
		public lastMessage: string,
		public createdAt?: Date,
		public updatedAt?: Date
	) {}

	public static fromObject(userData: any): Chat {
		return new Chat(
			userData.id,
			userData.userId,
			userData.isRead,
			userData.lastMessage,
			userData.createdAt,
			userData.updatedAt
		);
	}

	public toResponse() {
		return {
			id: this.id,
			userId: this.userId,
			isRead: this.isRead,
			lastMessage: this.lastMessage,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}
