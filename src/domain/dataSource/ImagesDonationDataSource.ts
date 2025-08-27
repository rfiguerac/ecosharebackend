import { Donation, DonationImage } from "../entities";

export abstract class ImagesDonationDataSource {
  abstract create(
    imageUrl: string[],
    donationId: number
  ): Promise<DonationImage[]>;
  abstract deleteById(id: number): Promise<DonationImage>;
}
