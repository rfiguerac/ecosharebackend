import { DonationTransactionRepository } from "../../../repositories/donation/DonationTransactionRepository";

export class DeleteDonationTransaction {
  constructor(
    private readonly donationTransactionRepository: DonationTransactionRepository
  ) {}

  async execute(id: number): Promise<boolean> {
    const result = await this.donationTransactionRepository.delete(id);
    return result;
  }
}
