import { ImagesDonationDataSource } from "../../domain/dataSource/ImagesDonationDataSource";
import { ImagesDonationRepository } from "../../domain/repositories/donation/ImagesDonationRepository";

export class ImagesDonationRepositoryImpl implements ImagesDonationRepository {
  constructor(private readonly dataSource: ImagesDonationDataSource) {}

  async create(imageUrl: string[], donationId: number): Promise<void> {
    await this.dataSource.create(imageUrl, donationId);
  }

  async deleteById(id: number): Promise<void> {
    await this.dataSource.deleteById(id);
  }
}
