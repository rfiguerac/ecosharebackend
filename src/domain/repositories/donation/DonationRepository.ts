import { CreateDonationDto } from "../../dtos";
import { UpdateDonationDto } from "../../dtos/donation/UpdateDonationDto";
import { PaginationDto } from "../../dtos/shared/PaginationDto";
import { PaginationResponse } from "../../dtos/shared/PaginationResponse";
import { Donation } from "../../entities";

export abstract class DonationRepository {
  abstract create(createDonationDto: CreateDonationDto): Promise<Donation>;
  abstract getById(id: number): Promise<Donation>;
  abstract getAll(
    paginationDto: PaginationDto
  ): Promise<PaginationResponse<Donation>>;
  abstract updateById(
    id: number,
    updateDonationDto: UpdateDonationDto
  ): Promise<Donation>;
  abstract deleteById(id: number): Promise<Donation>;
}
