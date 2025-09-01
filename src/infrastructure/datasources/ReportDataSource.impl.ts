import { prisma } from "../../data/postgresql";
import {
	Report,
	ReportDataSource,
	CreateReportDto,
	UpdateReportDto,
} from "../../domain";
import { HttpException } from "../../presentation/errors/httpException";

export class ReportDataSourceImpl extends ReportDataSource {
	async create(dto: CreateReportDto): Promise<Report> {
		const report = await prisma.report.create({
			data: {
				description: dto.description,
                reporterId: dto.reporterId,
                donationId: dto.donationId,
            },
		});
		return Report.fromObject(report);
	}

	async getReportById(reportId: number): Promise<Report> {
		const report = await prisma.report.findUnique({
			where: { id: reportId },
		});
		if (!report) {
			throw new HttpException(404, "Report not found");
		}
		return Report.fromObject(report);
	}

	async getReports(): Promise<Report[]> {
		const reports = await prisma.report.findMany();
		return reports.map(Report.fromObject);
	}

	async update(reportId: number, dto: UpdateReportDto): Promise<Report> {
		const report = await prisma.report.update({
			where: { id: reportId },
			data: {
                description: dto.description,
                isReviewed: dto.isReviewed,
                updatedAt: dto.updatedAt,
			},
		});
		return Report.fromObject(report);
	}

	async delete(reportId: number): Promise<Report> {
		const report = await prisma.report.delete({
			where: { id: reportId },
		});
		return Report.fromObject(report);
	}
}
