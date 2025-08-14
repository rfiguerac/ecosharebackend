import { DonationRepositoryImpl } from "../../../infrastructure";
import { Donation } from "../../entities";

export class GetDonation {
  constructor(private repo: DonationRepositoryImpl) {}
  async execute(id: number): Promise<Donation> {
    const d = await this.repo.getById(id);
    if (!d) throw new Error("Donación no encontrada");
    return d;
  }
}
