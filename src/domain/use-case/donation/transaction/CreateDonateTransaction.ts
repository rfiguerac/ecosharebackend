import { CreateDonationTransactionDto } from "../../../dtos";
import { DonationTransaction } from "../../../entities/DonationTransaction";
import { DonationTransactionRepository } from "../../../repositories/donation/DonationTransactionRepository";

export class CreateDonationTransaction {
  constructor(
    private readonly donationTransactionRepository: DonationTransactionRepository
  ) {}

  async execute(
    dto: CreateDonationTransactionDto
  ): Promise<DonationTransaction> {
    const transaction = await this.donationTransactionRepository.create(dto);
    return transaction;
  }
}
