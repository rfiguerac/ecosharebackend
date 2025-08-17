import { Category, CategoryRepository } from "../..";

export class ListCategory {
  constructor(private repository: CategoryRepository) {}
  async execute(): Promise<Category[]> {
    return this.repository.findAll();
  }
}
