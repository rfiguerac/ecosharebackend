import { prisma } from "../../data/postgresql";
import { ImagesDonationDataSource } from "../../domain/dataSource/ImagesDonationDataSource";

export class ImagesDonationDataSourceImpl implements ImagesDonationDataSource {
  async create(imageUrl: string[], donationId: number): Promise<void> {
    await prisma.donationImage.createMany({
      data: imageUrl.map((url) => ({
        imageUrl: url,
        donationId,
      })),
    });
  }

  async deleteById(id: number): Promise<void> {
    await prisma.donationImage.delete({
      where: { id },
    });
  }
}
