import {
  CreateDonationDto,
  Donation as DonationEntity,
  UpdateDonationDto,
} from "../../domain";
import { DonationDataSource } from "../../domain/dataSource";
import { prisma } from "../../data/posgresql";

export class DonationDataSourceImpl implements DonationDataSource {
  // Crear una donación
  async create(data: CreateDonationDto): Promise<DonationEntity> {
    const donation = await prisma.donation.create({
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        urgency: data.urgency,
        categoryId: data.categoryId,
        donorId: data.donorId,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });

    return new DonationEntity(
      donation.id,
      donation.title,
      donation.donorId,
      donation.categoryId,
      donation.description,
      donation.imageUrl,
      donation.latitude,
      donation.longitude,
      donation.expiryDate,
      donation.createdAt,
      donation.updatedAt
    );
  }

  // Buscar donación por ID
  async findById(id: number): Promise<DonationEntity> {
    const donation = await prisma.donation.findUnique({ where: { id } });
    if (!donation) throw new Error(`Donation with id ${id} not found`);

    return new DonationEntity(
      donation.id,
      donation.title,
      donation.donorId,
      donation.categoryId,
      donation.description,
      donation.imageUrl,
      donation.latitude,
      donation.longitude,
      donation.expiryDate,
      donation.createdAt,
      donation.updatedAt
    );
  }

  // Listar todas las donaciones
  async findAll(): Promise<DonationEntity[]> {
    const donations = await prisma.donation.findMany();
    return donations.map(
      (donation) =>
        new DonationEntity(
          donation.id,
          donation.title,
          donation.donorId,
          donation.categoryId,
          donation.description,
          donation.imageUrl,
          donation.latitude,
          donation.longitude,
          donation.expiryDate,
          donation.createdAt,
          donation.updatedAt
        )
    );
  }

  // Actualizar una donación
  async update(dto: UpdateDonationDto): Promise<DonationEntity> {
    const donation = await prisma.donation.update({
      where: { id: dto.id },
      data: {
        title: dto.title!,
        description: dto.description!,
        imageUrl: dto.imageUrl!,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
        urgency: dto.urgency!,
        categoryId: dto.categoryId!,
        latitude: dto.latitude!,
        longitude: dto.longitude!,
      },
    });

    return new DonationEntity(
      donation.id,
      donation.title,
      donation.donorId,
      donation.categoryId,
      donation.description,
      donation.imageUrl,
      donation.latitude,
      donation.longitude,
      donation.expiryDate,
      donation.createdAt,
      donation.updatedAt
    );
  }

  // Eliminar una donación por ID
  async deleteById(id: number): Promise<DonationEntity> {
    const donation = await prisma.donation.delete({ where: { id } });

    return new DonationEntity(
      donation.id,
      donation.title,
      donation.donorId,
      donation.categoryId,
      donation.description,
      donation.imageUrl,
      donation.latitude,
      donation.longitude,
      donation.expiryDate,
      donation.createdAt,
      donation.updatedAt
    );
  }
}
