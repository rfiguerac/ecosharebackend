import { Report, ReportRepository, UpdateReportDto } from "../..";

export class UpdateReport {
	constructor(private repository: ReportRepository) {}
	async execute(id: number, dto: UpdateReportDto): Promise<Report> {
		return this.repository.update(id, dto);
	}
}
