export class Category {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public icon: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}

  public static fromObject(categoryData: any): Category {
    return new Category(
      categoryData.id,
      categoryData.title,
      categoryData.description,
      categoryData.icon,
      categoryData.createdAt,
      categoryData.updatedAt
    );
  }

  public toResponse() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      icon: this.icon,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
