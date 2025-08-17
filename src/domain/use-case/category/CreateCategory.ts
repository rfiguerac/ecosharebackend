import { CreateCategoryDto } from "../../dtos";
import { Category } from "../../entities";
import { CategoryRepository } from "../../repositories";

export class CreateCategory {
  constructor(private repository: CategoryRepository) {}
  async execute(dto: CreateCategoryDto): Promise<Category> {
    return this.repository.create(dto);
  }
}
