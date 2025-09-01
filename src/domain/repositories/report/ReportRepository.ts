import { Report, CreateReportDto, UpdateReportDto } from "../..";

export abstract class ReportRepository {
	abstract create(dto: CreateReportDto): Promise<Report>;
	abstract update(reportId: number, dto: UpdateReportDto): Promise<Report>;
    abstract delete(reportId: number): Promise<Report>;
    abstract getReports(): Promise<Report[]>;
    abstract getReportById(reportId: number): Promise<Report>;
}
