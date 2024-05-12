import { Injectable } from '@nestjs/common';
import {ReportRepository} from "~features/report/domain/repository/report_repository";
import {ReportType} from "~features/report/domain/models/report_type";

@Injectable()
export class CreateReportService {
    constructor(private readonly repo: ReportRepository) {}
    async createReport(type: ReportType): Promise<boolean> {
        return this.repo.createReport(type)
    }
}
