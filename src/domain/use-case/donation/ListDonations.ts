import { Donation } from "../..";
import { DonationRepository } from "../../../domain";

export class ListDonations {
  constructor(private repo: DonationRepository) {}
  async execute(): Promise<Donation[]> {
    return this.repo.getAll();
  }
}
