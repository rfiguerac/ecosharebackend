import { ImagesDonationRepository } from "../../repositories/donation/ImagesDonationRepository";

export class AddImagesDonation {
  constructor(private readonly repository: ImagesDonationRepository) {}

  async execute(imageUrl: string[], donationId: number): Promise<void> {
    await this.repository.create(imageUrl, donationId);
  }
}
