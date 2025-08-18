import {
  CreateDonationDto,
  Donation,
  DonationDataSource,
  DonationRepository,
  UpdateDonationDto,
} from "../../domain";
import { PaginationDto } from "../../domain/dtos/shared/PaginationDto";
import { PaginationResponse } from "../../domain/dtos/shared/PaginationResponse";

export class DonationRepositoryImpl implements DonationRepository {
  constructor(private readonly datasource: DonationDataSource) {}

  create = async (
    dto: CreateDonationDto,
    imageUrls: string[]
  ): Promise<Donation> => {
    return this.datasource.create(dto, imageUrls);
  };

  getById = async (id: number): Promise<Donation> => {
    return this.datasource.findById(id);
  };

  getAll = async (
    paginationDto: PaginationDto
  ): Promise<PaginationResponse<Donation>> => {
    return this.datasource.findAll(paginationDto);
  };

  updateById = async (
    id: number,
    dto: UpdateDonationDto
  ): Promise<Donation> => {
    return this.datasource.update(id, dto);
  };

  deleteById = async (id: number): Promise<Donation> => {
    return this.datasource.deleteById(id);
  };
}
