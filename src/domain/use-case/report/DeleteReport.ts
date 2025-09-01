import { Report, ReportRepository } from "../../";

export class DeleteReport {
	constructor(private repository: ReportRepository) {}
	async execute(id: number): Promise<Report> {
		return this.repository.delete(id);
	}
}
