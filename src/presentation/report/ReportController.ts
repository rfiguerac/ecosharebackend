import { Request, Response } from "express";
import {
	ReportRepository,
	GetAllReports,
	GetReportById,
    CreateReport,
    UpdateReport,
    DeleteReport
} from "../../domain";
export class ReportController {
	constructor(private readonly reportRepository: ReportRepository) {}
    getAllReports = async (req: Request, res: Response) => {
        try {
            const reports = await new GetAllReports(this.reportRepository).execute();
            res.status(200).json(reports);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };
    getReportById = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const report = await new GetReportById(this.reportRepository).execute(id);
            if (!report) {
                return res.status(404).json({ message: "Report not found" });
            }
            res.status(200).json(report);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };
    createReport = async (req: Request, res: Response) => {
        try {
            const reportData = req.body;
            const newReport = await new CreateReport(this.reportRepository).execute(reportData);
            res.status(201).json(newReport);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };
    updateReport = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const reportData = req.body;
            const updatedReport = await new UpdateReport(this.reportRepository).execute(id, reportData);
            res.status(200).json(updatedReport);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };
    deleteReport = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const deletedReport = await new DeleteReport(this.reportRepository).execute(id);
            res.status(200).json(deletedReport);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };
}
