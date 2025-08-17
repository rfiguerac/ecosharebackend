import { Category, CategoryRepository } from "../../";

export class DeleteCategory {
  constructor(private repository: CategoryRepository) {}
  async execute(id: number): Promise<Category> {
    return this.repository.deleteById(id);
  }
}
