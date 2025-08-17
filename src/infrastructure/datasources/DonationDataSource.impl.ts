import {
  CreateDonationDto,
  Donation as DonationEntity,
  UpdateDonationDto,
} from "../../domain";
import { DonationDataSource } from "../../domain/dataSource";
import { prisma } from "../../data/posgresql";
import { HttpException } from "../../presentation/errors/HttpException";

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
        // Corrección: Usamos `createMany` dentro de la misma operación
        images: {
          createMany: {
            data: imageUrls.map((url) => ({
              imageUrl: url,
            })),
          },
        },
      },
      // Corrección: Se incluye el array de imágenes en la respuesta
      include: {
        images: true,
      },
    });
    return DonationEntity.fromObject(donation);
  }

  // Buscar donación por ID
  async findById(id: number): Promise<DonationEntity> {
    // Corrección: Se incluye el array de imágenes en la búsqueda
    const donation = await prisma.donation.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!donation) {
      throw new HttpException(404, "Donation not found");
    }

    return DonationEntity.fromObject(donation);
  }

  // Listar todas las donaciones
  async findAll(): Promise<DonationEntity[]> {
    // Corrección: Se incluye el array de imágenes en la lista
    const donations = await prisma.donation.findMany({
      include: { images: true },
    });
    return donations.map((donation) => {
      return DonationEntity.fromObject(donation);
    });
  }

  // Actualizar una donación
  async update(id: number, dto: UpdateDonationDto): Promise<DonationEntity> {
    await this.findById(id); // Verifica que la donación exista
    // Corrección: Se incluye el array de imágenes en la respuesta
    const donation = await prisma.donation.update({
      where: { id: id },
      data: {
        title: dto.title!,
        description: dto.description!,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
        urgency: dto.urgency!,
        categoryId: dto.categoryId!,
        latitude: dto.latitude!,
        longitude: dto.longitude!,
      },
      include: { images: true },
    });

    return DonationEntity.fromObject(donation);
  }

  // Eliminar una donación por ID
  async deleteById(id: number): Promise<DonationEntity> {
    // Corrección: Se incluye el array de imágenes en la respuesta
    const donation = await prisma.donation.delete({
      where: { id },
      include: { images: true },
    });
    return DonationEntity.fromObject(donation);
  }
}
