import { DonationTransaction } from "../../../entities/DonationTransaction";
import { DonationTransactionRepository } from "../../../repositories/donation/DonationTransactionRepository";

export class GetAllDonationTransactions {
  constructor(
    private readonly donationTransactionRepository: DonationTransactionRepository
  ) {}

  async execute(): Promise<DonationTransaction[]> {
    const transactions =
      await this.donationTransactionRepository.getAllTransactions();
    return transactions;
  }
}
