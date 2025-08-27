export type TransactionStatus = "Reserved" | "Donated";

export interface UpdateDonationTransactionDto {
  status?: TransactionStatus;
}

export class DonationTransaction {
  constructor(
    public id: number,
    public donationId: number,
    public receiverId: number,
    public status: TransactionStatus = "Reserved",
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}

  public toResponse() {
    return {
      id: this.id,
      donationId: this.donationId,
      receiverId: this.receiverId,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
