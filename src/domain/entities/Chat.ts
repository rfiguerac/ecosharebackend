export class Chat {
	constructor(
		public id: number,
		public content: string,
		public senderId: string,
		public createdAt?: Date,
		public updatedAt?: Date
	) {}

	public static fromObject(userData: any): Chat {
		return new Chat(
			userData.id,
			userData.content,
			userData.senderId,
			userData.createdAt,
			userData.updatedAt
		);
	}

	public toResponse() {
		return {
			id: this.id,
			content: this.content,
			senderId: this.senderId,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}
