import { CreateDonationDto } from "../../dtos";
import { UpdateDonationDto } from "../../dtos/donation/UpdateDonationDto";
import { Donation } from "../../entities";

export abstract class DonationRepository {
  abstract create(
    createDonationDto: CreateDonationDto,
    imageUrls: string[]
  ): Promise<Donation>;
  abstract getById(id: number): Promise<Donation>;
  abstract getAll(): Promise<Donation[]>;
  abstract updateById(updateDonationDto: UpdateDonationDto): Promise<Donation>;
  abstract deleteById(id: number): Promise<Donation>;
}
