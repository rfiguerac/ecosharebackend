import { DonationImage } from "../..";

export abstract class ImagesDonationRepository {
  abstract create(
    imageUrl: string[],
    donationId: number
  ): Promise<DonationImage[]>;
  abstract deleteById(id: number): Promise<DonationImage>;
}
