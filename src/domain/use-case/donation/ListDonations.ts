import { Donation } from "../..";
import { DonationRepository } from "../../../domain";
import { PaginationDto } from "../../dtos/shared/PaginationDto";
import { PaginationResponse } from "../../dtos/shared/PaginationResponse";

export class ListDonations {
  constructor(private repo: DonationRepository) {}
  async execute(dto: PaginationDto): Promise<PaginationResponse<Donation>> {
    return this.repo.getAll(dto);
  }
}
