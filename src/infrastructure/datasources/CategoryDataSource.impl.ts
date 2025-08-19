import { prisma } from "../../data/postgresql";
import {
  Category,
  CategoryDataSource,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../../domain";
import { HttpException } from "../../presentation/errors/httpException";

export class CategoryDataSourceImpl extends CategoryDataSource {
  async create(dto: CreateCategoryDto): Promise<Category> {
    const category = await prisma.category.create({
      data: {
        title: dto.title,
        description: dto.description,
        icon: dto.icon,
      },
    });

    return Category.fromObject(category);
  }

  async findById(id: number): Promise<Category> {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new HttpException(404, "Category not found");
    }

    return Category.fromObject(category);
  }

  async findAll(): Promise<Category[]> {
    const categories = await prisma.category.findMany();
    return categories.map(Category.fromObject);
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    await this.findById(id);
    const category = await prisma.category.update({
      where: { id: id },
      data: {
        title: dto.title,
        description: dto.description,
        icon: dto.icon,
      },
    });

    return Category.fromObject(category);
  }

  async deleteById(id: number): Promise<Category> {
    await this.findById(id);
    const category = await prisma.category.delete({
      where: { id },
    });

    return Category.fromObject(category);
  }
}
