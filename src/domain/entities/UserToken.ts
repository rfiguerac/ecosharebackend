export class UserToken {
	constructor(
		public id: number,
		public token: string,
		public userId: number,
		public createdAt?: Date,
		public updatedAt?: Date
	) {}

	public static fromObject(tokenData: any): UserToken {
		return new UserToken(
			tokenData.id,
			tokenData.token,
			tokenData.userId,
			tokenData.createdAt,
			tokenData.updatedAt
		);
	}

	public toResponse() {
		return {
			id: this.id,
			token: this.token,
			userId: this.userId,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}
