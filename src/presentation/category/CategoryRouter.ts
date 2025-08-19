import { Router } from "express";
import {
  CategoryRepositoryImpl,
  CategoryDataSourceImpl,
} from "../../infrastructure";
import { CategoryController } from "./CategoryController";
import { validateDto } from "../../middleware";
import { CreateCategoryDto } from "../../domain";

export class CategoryRouter {
  public static router(): Router {
    const router = Router();
    const datasource = new CategoryDataSourceImpl();
    const categoriesRepository = new CategoryRepositoryImpl(datasource);
    const categoryController = new CategoryController(categoriesRepository);

    router.post("/", validateDto(CreateCategoryDto), categoryController.create);
    router.get("/:id", categoryController.getById);
    router.get("/", categoryController.list);
    router.put("/:id", categoryController.update);
    router.delete("/:id", categoryController.delete);

    return router;
  }
}
