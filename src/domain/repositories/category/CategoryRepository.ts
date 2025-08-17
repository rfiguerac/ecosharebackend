import { Category, CreateCategoryDto, UpdateCategoryDto } from "../..";

export abstract class CategoryRepository {
  abstract create(dto: CreateCategoryDto): Promise<Category>;
  abstract findById(id: number): Promise<Category>;
  abstract findAll(): Promise<Category[]>;
  abstract update(dto: UpdateCategoryDto): Promise<Category>;
  abstract deleteById(id: number): Promise<Category>;
}
