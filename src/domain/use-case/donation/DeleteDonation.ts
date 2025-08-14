import { DonationRepository } from "../../../domain";

export class DeleteDonation {
  constructor(private repo: DonationRepository) {}
  async execute(id: number): Promise<void> {
    await this.repo.deleteById(id);
  }
}
