import { Donation } from "../..";
import { DonationRepository } from "../../../domain";
import { CreateDonationDto } from "../../dtos";

export class CreateDonation {
  constructor(private repo: DonationRepository) {}
  async execute(
    dto: CreateDonationDto,
    imageUrls: string[]
  ): Promise<Donation> {
    return this.repo.create(dto, imageUrls);
  }
}
