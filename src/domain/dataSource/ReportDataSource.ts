import { Report } from "..";
import { CreateReportDto, UpdateReportDto } from "../dtos/report/..";

export abstract class ReportDataSource {
	abstract getReports(): Promise<Report[]>;
	abstract getReportById(reportId: number): Promise<Report>;
	abstract create(dto: CreateReportDto): Promise<Report>;
    abstract update(reportId: number, dto: UpdateReportDto): Promise<Report>;
    abstract delete(reportId: number): Promise<Report>;
}
