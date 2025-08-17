import { Category, CategoryRepository, UpdateCategoryDto } from "../..";

export class UpdateCategory {
  constructor(private repository: CategoryRepository) {}
  async execute(dto: UpdateCategoryDto): Promise<Category> {
    return this.repository.update(dto);
  }
}
