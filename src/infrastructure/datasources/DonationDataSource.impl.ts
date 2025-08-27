// src/infrastructure/datasources/DonationDataSourceImpl.ts

import {
  CreateDonationDto,
  Donation as DonationEntity,
  UpdateDonationDto,
} from "../../domain";
import { DonationDataSource } from "../../domain/dataSource";
import { prisma } from "../../data/postgresql";
import { HttpException } from "../../presentation/errors/httpException";
import { PaginationDto } from "../../domain/dtos/shared/PaginationDto";
import { PaginationResponse } from "../../domain/dtos/shared/PaginationResponse";

export class DonationDataSourceImpl implements DonationDataSource {
  // Crear una donación
  async create(data: CreateDonationDto): Promise<DonationEntity> {
    const donation = await prisma.donation.create({
      data: {
        title: data.title,
        description: data.description,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        urgent: data.urgent,
        categoryId: data.categoryId,
        donorId: data.donorId,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
    return DonationEntity.fromObject(donation);
  }

  // Buscar donación por ID
  async findById(id: number): Promise<DonationEntity> {
    const donation = await prisma.donation.findUnique({
      where: { id },
      include: {
        images: true,
        transaction: true, // 👈 Necesario para calcular status
      },
    });

    if (!donation) {
      throw new HttpException(404, "Donation not found");
    }

    return DonationEntity.fromObject(donation);
  }

  // 🔹 Listar todas las donaciones con paginación y estado calculado
  async findAll(
    paginationDto: PaginationDto
  ): Promise<PaginationResponse<DonationEntity>> {
    const totalDonations = await prisma.donation.count();

    const donations = await prisma.donation.findMany({
      include: {
        images: true,
        transaction: true, // 👈 Incluimos la transacción para calcular el status
      },
      skip: (paginationDto.page - 1) * paginationDto.limit,
      take: paginationDto.limit,
      orderBy: {
        createdAt: "desc", // 👈 Opcional: las más recientes primero
      },
    });

    const totalPages = Math.ceil(totalDonations / paginationDto.limit);

    return {
      data: donations.map((donation) => DonationEntity.fromObject(donation)), // ✅ Devuelve instancias reales
      next:
        paginationDto.page < totalPages
          ? `/donations?page=${paginationDto.page + 1}&limit=${
              paginationDto.limit
            }`
          : null,
      previous:
        paginationDto.page > 1
          ? `/donations?page=${paginationDto.page - 1}&limit=${
              paginationDto.limit
            }`
          : null,
      page: paginationDto.page,
      limit: paginationDto.limit,
      total: totalDonations,
      totalPages: totalPages,
    };
  }

  // Actualizar una donación
  async update(id: number, dto: UpdateDonationDto): Promise<DonationEntity> {
    await this.findById(id);

    const donation = await prisma.donation.update({
      where: { id },
      data: {
        title: dto.title!,
        description: dto.description!,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
        urgent: dto.urgent!,
        categoryId: dto.categoryId!,
        latitude: dto.latitude!,
        longitude: dto.longitude!,
      },
      include: {
        images: true,
        transaction: true, // 👈 Incluimos transacción para status
      },
    });

    return DonationEntity.fromObject(donation);
  }

  // Eliminar una donación por ID
  async deleteById(id: number): Promise<DonationEntity> {
    const donation = await prisma.donation.delete({
      where: { id },
      include: {
        images: true,
        transaction: true, // 👈 Incluimos transacción para status
      },
    });

    return DonationEntity.fromObject(donation);
  }
}
