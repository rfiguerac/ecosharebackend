// src/domain/use-case/donation/CreateDonation.ts

import { Donation } from "../..";
import { DonationRepository } from "../../../domain";
import { CreateDonationDto } from "../../dtos";

export class CreateDonation {
  constructor(private repo: DonationRepository) {}
  async execute(dto: CreateDonationDto): Promise<Donation> {
    return this.repo.create(dto);
  }
}
