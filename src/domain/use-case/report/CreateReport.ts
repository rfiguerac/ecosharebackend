import { CreateReportDto } from "../../dtos/report/CreateReportDto";
import { Report } from "../../entities/Report";
import { ReportRepository } from "../../repositories/report/ReportRepository";

export class CreateReport {
	constructor(public repository: ReportRepository) {}

	async execute(dto: CreateReportDto): Promise<Report> {
		return this.repository.create(dto);
	}
}
