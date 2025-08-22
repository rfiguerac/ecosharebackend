import { ImagesDonationRepository } from "../../repositories/donation/ImagesDonationRepository";

class DeleteImagesDonation {
  constructor(private readonly repository: ImagesDonationRepository) {}

  async execute(id: number): Promise<void> {
    await this.repository.deleteById(id);
  }
}
