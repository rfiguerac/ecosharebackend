import { Router } from "express";
import { ReportRepositoryImpl, ReportDataSourceImpl } from "../../infrastructure";
import { ReportController } from "./ReportController";
import { AuthMiddleware, validateDto } from "../../middleware";
import { CreateReportDto, UpdateReportDto } from "../../domain/dtos/..";

export class ReportRouter {
	public static router(): Router {
		const router = Router();
		const datasource = new ReportDataSourceImpl();
		const reportRepository = new ReportRepositoryImpl(datasource);
		const reportController = new ReportController(reportRepository);

		//router.use(AuthMiddleware.validateJWT);

		router.get("/", reportController.getAllReports);
		router.get("/:id", reportController.getReportById);
        router.delete("/:id", reportController.deleteReport);
		router.post("/", validateDto(CreateReportDto), reportController.createReport);
        router.put("/:id", validateDto(UpdateReportDto), reportController.updateReport);

		return router;
	}
}
