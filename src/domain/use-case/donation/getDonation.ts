import { DonationRepository } from "../../../domain";
import { Donation } from "../../entities";

export class GetDonation {
  constructor(private repo: DonationRepository) {}
  async execute(id: number): Promise<Donation> {
    const d = await this.repo.getById(id);
    if (!d) throw new Error("Donación no encontrada");
    return d;
  }
}
