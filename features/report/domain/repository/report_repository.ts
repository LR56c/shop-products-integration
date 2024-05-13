import { ValidURL } from '../../../shared/domain/value_objects/ValidURL'
import { ValidString } from '../../../shared/domain/value_objects/ValidString'
import {ReportType} from "../models/report_type";
import {UUID} from "../../../shared/domain/value_objects/UUID";
import {ValidInteger} from "../../../shared/domain/value_objects/ValidInteger";
import {Report} from "../models/report";
import {ValidDate} from "../../../shared/domain/value_objects/ValidDate";

export abstract class ReportRepository {
    abstract createReport(type : ReportType, name: ValidString, data : Uint8Array): Promise<ValidURL>
    abstract deleteReport(id: UUID): Promise<boolean>
    abstract getReport(from: ValidInteger, to: ValidInteger, type?: ReportType,
                       from_date?: ValidDate, to_date?: ValidDate): Promise<Report[]>
}
