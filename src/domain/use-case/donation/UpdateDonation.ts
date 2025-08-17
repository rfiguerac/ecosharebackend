import { Donation, DonationRepository } from "../../../domain";
import { UpdateDonationDto } from "../../dtos/donation/UpdateDonationDto";

export class UpdateDonation {
  constructor(private repo: DonationRepository) {}
  async execute(id: number, dto: UpdateDonationDto): Promise<Donation> {
    return this.repo.updateById(id, dto);
  }
}
