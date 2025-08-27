import { DonationImage } from "../../domain";
import { ImagesDonationDataSource } from "../../domain/dataSource/ImagesDonationDataSource";
import { ImagesDonationRepository } from "../../domain/repositories/donation/ImagesDonationRepository";

export class ImagesDonationRepositoryImpl implements ImagesDonationRepository {
  constructor(private readonly dataSource: ImagesDonationDataSource) {}

  async create(
    imageUrl: string[],
    donationId: number
  ): Promise<DonationImage[]> {
    return await this.dataSource.create(imageUrl, donationId);
  }

  async deleteById(id: number): Promise<DonationImage> {
    return await this.dataSource.deleteById(id);
  }
}
