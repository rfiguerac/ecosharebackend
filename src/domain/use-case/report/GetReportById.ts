import { ReportRepository, Report } from "../..";

export class GetReportById {
    constructor(public repository: ReportRepository) {}
    
    async execute(reportId: number): Promise<Report> {
        return this.repository.getReportById(reportId);
    }
}