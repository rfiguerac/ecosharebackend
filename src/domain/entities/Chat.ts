export class Chat {
	constructor(
		public id: number,
		public content: string,
		public userId: string,
		public createdAt?: Date,
		public updatedAt?: Date
	) {}

	public static fromObject(userData: any): Chat {
		return new Chat(
			userData.id,
			userData.content,
			userData.userId,
			userData.createdAt,
			userData.updatedAt
		);
	}

	public toResponse() {
		return {
			id: this.id,
			content: this.content,
			userId: this.userId,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}
