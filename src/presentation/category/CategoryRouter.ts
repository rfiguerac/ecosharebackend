import { Router } from "express";
import {
  CategoryRepositoryImpl,
  CategoryDataSourceImpl,
} from "../../infrastructure";
import { CategoryController } from "./CategoryController";

export class CategoryRouter {
  public static router(): Router {
    const router = Router();
    const datasource = new CategoryDataSourceImpl();
    const categoriesRepository = new CategoryRepositoryImpl(datasource);
    const categoryController = new CategoryController(categoriesRepository);

    router.post("/", categoryController.create);
    router.get("/:id", categoryController.getById);
    router.get("/", categoryController.list);
    router.put("/:id", categoryController.update);
    router.delete("/:id", categoryController.delete);

    return router;
  }
}
