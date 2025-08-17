import { NextFunction, Request, Response } from "express";
import {
  CategoryRepository,
  CreateCategory,
  CreateCategoryDto,
  DeleteCategory,
  GetCategory,
  ListCategory,
  UpdateCategory,
} from "../../domain";

export class CategoryController {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = new CreateCategory(this.categoryRepository).execute(
        req.body
      );
      res.status(201).json((await category).toResponse());
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const category = await new GetCategory(this.categoryRepository).execute(
        id
      );
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category.toResponse());
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await new ListCategory(
        this.categoryRepository
      ).execute();
      res.status(200).json(categories.map((category) => category.toResponse()));
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const category = await new UpdateCategory(
        this.categoryRepository
      ).execute(req.body);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category.toResponse());
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await new DeleteCategory(this.categoryRepository).execute(
        id
      );
      if (!result) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
