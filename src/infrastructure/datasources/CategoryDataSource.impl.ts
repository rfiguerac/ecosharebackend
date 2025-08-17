import { prisma } from "../../data/posgresql";
import {
  Category,
  CategoryDataSource,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../../domain";

export class CategoryDataSourceImpl extends CategoryDataSource {
  async create(dto: CreateCategoryDto): Promise<Category> {
    const category = await prisma.category.create({
      data: {
        title: dto.title,
        description: dto.description,
      },
    });

    return Category.fromObject(category);
  }

  async findById(id: number): Promise<Category> {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    return Category.fromObject(category);
  }

  async findAll(): Promise<Category[]> {
    const categories = await prisma.category.findMany();
    return categories.map(Category.fromObject);
  }

  async update(dto: UpdateCategoryDto): Promise<Category> {
    const category = await prisma.category.update({
      where: { id: dto.id },
      data: {
        title: dto.title,
        description: dto.description,
      },
    });

    return Category.fromObject(category);
  }

  async deleteById(id: number): Promise<Category> {
    const category = await prisma.category.delete({
      where: { id },
    });

    return Category.fromObject(category);
  }
}
