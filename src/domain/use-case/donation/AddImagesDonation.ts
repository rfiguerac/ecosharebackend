import { DonationImage } from "../../entities";
import { ImagesDonationRepository } from "../../repositories/donation/ImagesDonationRepository";

export class AddImagesDonation {
  constructor(private readonly repository: ImagesDonationRepository) {}

  async execute(
    imageUrl: string[],
    donationId: number
  ): Promise<DonationImage[]> {
    return await this.repository.create(imageUrl, donationId);
  }
}
