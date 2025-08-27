import { UpdateDonationTransactionDto } from "../../../dtos";
import { DonationTransaction } from "../../../entities/DonationTransaction";
import { DonationTransactionRepository } from "../../../repositories/donation/DonationTransactionRepository";

export class UpdateDonationTransaction {
  constructor(
    private readonly donationTransactionRepository: DonationTransactionRepository
  ) {}

  async execute(
    id: number,
    dto: UpdateDonationTransactionDto
  ): Promise<DonationTransaction | null> {
    const transaction = await this.donationTransactionRepository.update(
      id,
      dto
    );
    return transaction;
  }
}
