import { Request, Response } from "express";
import {
  CategoryRepository,
  CreateCategory,
  DeleteCategory,
  GetCategory,
  ListCategory,
  UpdateCategory,
} from "../../domain";

export class CategoryController {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  create = async (req: Request, res: Response) => {
    try {
      const category = new CreateCategory(this.categoryRepository).execute(
        req.body
      );
      res.status(201).json((await category).toResponse());
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getById = async (req: Request, res: Response) => {
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
      res.status(500).json({ message: "Internal server error" });
    }
  };

  list = async (req: Request, res: Response) => {
    try {
      const categories = await new ListCategory(
        this.categoryRepository
      ).execute();
      res.status(200).json(categories.map((category) => category.toResponse()));
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const category = await new UpdateCategory(
        this.categoryRepository
      ).execute(id, req.body);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category.toResponse());
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const category = await new DeleteCategory(
        this.categoryRepository
      ).execute(id);
      res.status(200).send(category);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
