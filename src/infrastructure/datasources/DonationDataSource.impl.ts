import {
  CreateDonationDto,
  Donation as DonationEntity,
  UpdateDonationDto,
} from "../../domain";
import { DonationDataSource } from "../../domain/dataSource";
import { prisma } from "../../data/posgresql";

export class DonationDataSourceImpl implements DonationDataSource {
  // Crear una donación
  async create(
    data: CreateDonationDto,
    imageUrls: string[]
  ): Promise<DonationEntity> {
    const donation = await prisma.donation.create({
      data: {
        title: data.title,
        description: data.description,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        urgency: data.urgency,
        categoryId: data.categoryId,
        donorId: data.donorId,
        latitude: data.latitude,
        longitude: data.longitude,
        // Crea las imágenes relacionadas en la misma operación
        images: {
          createMany: {
            data: imageUrls.map((url) => ({
              imageUrl: url,
            })),
          },
        },
      },
      // Es crucial incluir las imágenes en el resultado para que el `fromObject` funcione
      include: {
        images: true,
      },
    });

    return DonationEntity.fromObject(donation);
  }

  // Buscar donación por ID
  async findById(id: number): Promise<DonationEntity> {
    const donation = await prisma.donation.findUnique({ where: { id } });
    if (!donation) throw new Error(`Donation with id ${id} not found`);

    return DonationEntity.fromObject(donation);
  }

  // Listar todas las donaciones
  async findAll(): Promise<DonationEntity[]> {
    const donations = await prisma.donation.findMany();
    return donations.map((donation) => {
      return DonationEntity.fromObject(donation);
    });
  }

  // Actualizar una donación
  async update(dto: UpdateDonationDto): Promise<DonationEntity> {
    const donation = await prisma.donation.update({
      where: { id: dto.id },
      data: {
        title: dto.title!,
        description: dto.description!,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
        urgency: dto.urgency!,
        categoryId: dto.categoryId!,
        latitude: dto.latitude!,
        longitude: dto.longitude!,
      },
    });

    return DonationEntity.fromObject(donation);
  }

  // Eliminar una donación por ID
  async deleteById(id: number): Promise<DonationEntity> {
    const donation = await prisma.donation.delete({ where: { id } });

    return DonationEntity.fromObject(donation);
  }
}
