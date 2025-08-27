// src/infrastructure/datasources/ImagesDonationDataSource.impl.ts

import { prisma } from "../../data/postgresql";
import { ImagesDonationDataSource } from "../../domain/dataSource/ImagesDonationDataSource";
import { DonationImage } from "../../domain/entities/DonationImage"; // Importa la nueva entidad

export class ImagesDonationDataSourceImpl implements ImagesDonationDataSource {
  async create(
    imageUrl: string[],
    donationId: number
  ): Promise<DonationImage[]> {
    const createdImages = await Promise.all(
      imageUrl.map((url) =>
        prisma.donationImage.create({
          data: {
            imageUrl: url,
            donationId,
          },
        })
      )
    );
    return createdImages.map(DonationImage.fromObject);
  }

  async deleteById(id: number): Promise<DonationImage> {
    const image = await prisma.donationImage.delete({
      where: { id },
    });
    return DonationImage.fromObject(image);
  }
}
