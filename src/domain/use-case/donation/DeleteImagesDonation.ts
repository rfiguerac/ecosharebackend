import { DonationImage } from "../..";
import { ImagesDonationRepository } from "../../repositories/donation/ImagesDonationRepository";

class DeleteImagesDonation {
  constructor(private readonly repository: ImagesDonationRepository) {}

  async execute(id: number): Promise<DonationImage> {
    return await this.repository.deleteById(id);
  }
}
