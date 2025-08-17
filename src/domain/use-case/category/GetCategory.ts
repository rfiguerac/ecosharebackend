import { Category, CategoryRepository } from "../..";

export class GetCategory {
  constructor(private repository: CategoryRepository) {}
  async execute(id: number): Promise<Category> {
    const category = await this.repository.findById(id);
    if (!category) throw new Error("Category not found");
    return category;
  }
}
