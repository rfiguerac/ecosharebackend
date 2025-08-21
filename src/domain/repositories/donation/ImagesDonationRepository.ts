export abstract class ImagesDonationRepository {
  abstract create(imageUrl: string[], donationId: number): Promise<void>;
  abstract deleteById(id: number): Promise<void>;
}
