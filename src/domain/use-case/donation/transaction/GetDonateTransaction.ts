import { DonationTransaction } from "../../../entities/DonationTransaction";
import { DonationTransactionRepository } from "../../../repositories/donation/DonationTransactionRepository";

export class GetDonationTransaction {
  constructor(
    private readonly donationTransactionRepository: DonationTransactionRepository
  ) {}

  async execute(id: number): Promise<DonationTransaction | null> {
    const transaction = await this.donationTransactionRepository.findById(id);
    return transaction;
  }
}
