import { Injectable } from '@nestjs/common';
import {ReportRepository} from "~features/report/domain/repository/report_repository";

@Injectable()
export class GetReportService {
    constructor(private repo: ReportRepository) {
    }
    async getReport(): Promise<Report[]> {
        return this.repo.getReport(id)
    }
}
