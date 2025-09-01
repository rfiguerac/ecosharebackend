import {
	Report,
	ReportDataSource,
	ReportRepository,
	CreateReportDto,
	UpdateReportDto,
} from "../../domain";

export class ReportRepositoryImpl implements ReportRepository {
	constructor(private dataSource: ReportDataSource) {}

	create(dto: CreateReportDto): Promise<Report> {
		return this.dataSource.create(dto);
	}

	getReportById(reportId: number): Promise<Report> {
		return this.dataSource.getReportById(reportId);
	}

	getReports(): Promise<Report[]> {
		return this.dataSource.getReports();
	}

	update(reportId: number, dto: UpdateReportDto): Promise<Report> {
		return this.dataSource.update(reportId, dto);
	}

	delete(reportId: number): Promise<Report> {
		return this.dataSource.delete(reportId);
	}
}
