export interface Location {
  id: number;
  latitude: number;
  longitude: number;
}

export class Donation {
  constructor(
    public id: number | null,
    public title: string,
    public donorId: number,
    public categoryId: number,
    public description: string,
    public imageUrl: string,
    public latitude: number,
    public longitude: number,
    public expiryDate: Date | null,
    public createdAt: Date,
    public updatedAt: Date
  ) {
    this.validate();
  }

  private validate() {
    if (!this.title || this.title.trim().length < 3) {
      throw new Error("El título debe tener al menos 3 caracteres.");
    }
    // La validación del estado se ha eliminado porque el estado se gestiona en la tabla de transacciones.
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
      imageUrl: this.imageUrl,
      latitude: this.latitude,
      longitude: this.longitude,
      expiryDate: this.expiryDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      expired: this.isExpired(),
    };
  }

  public static fromObject(donationData: {
    id: number | null;
    title: string;
    donorId: number;
    categoryId: number;
    description: string;
    imageUrl: string;
    latitude: number;
    longitude: number;
    expiryDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }): Donation {
    return new Donation(
      donationData.id,
      donationData.title,
      donationData.donorId,
      donationData.categoryId,
      donationData.description,
      donationData.imageUrl,
      donationData.latitude,
      donationData.longitude,
      donationData.expiryDate,
      donationData.createdAt,
      donationData.updatedAt
    );
  }
}
