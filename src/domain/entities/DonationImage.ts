// src/domain/entities/DonationImage.ts

export class DonationImage {
  constructor(
    public id: number,
    public imageUrl: string,
    public donationId: number,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  public static fromObject(image: any): DonationImage {
    return new DonationImage(
      image.id,
      image.imageUrl,
      image.donationId,
      image.createdAt,
      image.updatedAt
    );
  }

  public toResponse() {
    return {
      id: this.id,
      imageUrl: this.imageUrl,
      donationId: this.donationId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
