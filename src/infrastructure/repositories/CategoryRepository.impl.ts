import {
  Category,
  CategoryDataSource,
  CategoryRepository,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../../domain";

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private dataSource: CategoryDataSource) {}

  create(dto: CreateCategoryDto): Promise<Category> {
    return this.dataSource.create(dto);
  }

  findById(id: number): Promise<Category> {
    return this.dataSource.findById(id);
  }

  findAll(): Promise<Category[]> {
    return this.dataSource.findAll();
  }

  update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    return this.dataSource.update(id, dto);
  }

  deleteById(id: number): Promise<Category> {
    return this.dataSource.deleteById(id);
  }
}
