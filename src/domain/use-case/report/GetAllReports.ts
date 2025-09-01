import { ReportRepository, Report } from "../..";

export class GetAllReports {
    constructor(public repository: ReportRepository) {}
    
    async execute(): Promise<Report[]> {
        return this.repository.getReports();
    }
}