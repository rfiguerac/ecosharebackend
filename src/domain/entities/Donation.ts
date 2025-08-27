// src/domain/entities/Donation.ts

export type DonationStatus = "Available" | "Reserved" | "Donated";

export interface Location {
  id: number;
  latitude: number;
  longitude: number;
}

export class Donation {
  constructor(
    public id: number | null,
    public title: string,
    public description: string,
    public images: { imageUrl: string }[],
    public donorId: number,
    public categoryId: number,
    public latitude: number,
    public longitude: number,
    public expiryDate: Date | null,
    public urgent: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
    public status: DonationStatus = "Available"
  ) {
    this.validate();
  }

  private validate() {
    if (!this.title || this.title.trim().length < 3) {
      throw new Error("El título debe tener al menos 3 caracteres.");
    }
  }

  public isExpired(): boolean {
    return this.expiryDate !== null && this.expiryDate.getTime() < Date.now();
  }

  public toResponse() {
    return {
      id: this.id,
      title: this.title,
      donorId: this.donorId,
      categoryId: this.categoryId,
      description: this.description,
      images: this.images,
      latitude: this.latitude,
      longitude: this.longitude,
      expiryDate: this.expiryDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      expired: this.isExpired(),
      urgent: this.urgent,
      status: this.status,
    };
  }

  public static fromObject(donationData: any): Donation {
    const status: DonationStatus = donationData.transaction
      ? donationData.transaction.status === "Reserved"
        ? "Reserved"
        : "Donated"
      : "Available";

    return new Donation(
      donationData.id,
      donationData.title,
      donationData.description,
      donationData.images || [],
      donationData.donorId,
      donationData.categoryId,
      donationData.latitude,
      donationData.longitude,
      donationData.expiryDate ? new Date(donationData.expiryDate) : null,
      donationData.urgent,
      donationData.createdAt ? new Date(donationData.createdAt) : undefined,
      donationData.updatedAt ? new Date(donationData.updatedAt) : undefined,
      status
    );
  }
}
