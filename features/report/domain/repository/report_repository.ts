import {ReportType} from "../models/report_type";
import {UUID} from "../../../shared/domain/value_objects/UUID";
import {ValidInteger} from "../../../shared/domain/value_objects/ValidInteger";
import {Report} from "../models/report";
import {ValidDate} from "../../../shared/domain/value_objects/ValidDate";

export abstract class ReportRepository {
    abstract createReport(type: ReportType): Promise<boolean>
    abstract deleteReport(id: UUID): Promise<boolean>
    abstract getReport(from: ValidInteger, to: ValidInteger, type?: ReportType,
                       from_date?: ValidDate, to_date?: ValidDate): Promise<Report[]>
}