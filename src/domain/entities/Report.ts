export class Report {
	constructor(
		public id: number,
        public description: string,
        public reporterId: number,
        public donationId: number,
        public isReviewed: boolean,
		public createdAt?: Date,
		public updatedAt?: Date
	) {}

	public static fromObject(userData: any): Report {
		return new Report(
			userData.id,
            userData.description,
            userData.reporterId,
            userData.donationId,
            userData.isReviewed,
			userData.createdAt,
			userData.updatedAt
		);
	}

	public toResponse() {
		return {
			id: this.id,
            description: this.description,
            reporterId: this.reporterId,
            donationId: this.donationId,
            isReviewed: this.isReviewed,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}
