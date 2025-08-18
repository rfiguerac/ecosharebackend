import { CreateDonationDto } from "../dtos";
import { UpdateDonationDto } from "../dtos/donation/UpdateDonationDto";
import { PaginationDto } from "../dtos/shared/PaginationDto";
import { PaginationResponse } from "../dtos/shared/PaginationResponse";
import { Donation } from "../entities";

export abstract class DonationDataSource {
  abstract create(
    dto: CreateDonationDto,
    imageUrls: string[]
  ): Promise<Donation>;
  abstract findById(id: number): Promise<Donation>;
  abstract findAll(
    paginationDto: PaginationDto
  ): Promise<PaginationResponse<Donation>>;
  abstract update(id: number, dto: UpdateDonationDto): Promise<Donation>;
  abstract deleteById(id: number): Promise<Donation>;
}
