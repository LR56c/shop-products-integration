import { CreateReportDto } from './create_report_dto'
import {BaseException} from "~features/shared/domain/exceptions/BaseException";
import {UUID} from "~features/shared/domain/value_objects/UUID";
import {ReportType} from "~features/report/domain/models/report_type";
import {ValidDate} from "~features/shared/domain/value_objects/ValidDate";
import {InvalidUUIDException} from "~features/shared/domain/exceptions/InvalidUUIDException";
import {wrapType} from "~features/shared/utils/WrapType";
import {ValidURL} from "~features/shared/domain/value_objects/ValidURL";
import {InvalidURLException} from "~features/shared/domain/exceptions/InvalidURLException";
import {ReportTypeException} from "~features/report/domain/exception/ReportTypeException";
import {InvalidDateException} from "~features/shared/domain/exceptions/InvalidDateException";

export function parseReport(dto: CreateReportDto): {
    errors: BaseException[],
        data: {
        id: UUID,
            url: ValidURL,
            type: ReportType,
            creationDate: ValidDate
    }
}
{
    const errors: BaseException[] = []

    const id = wrapType<UUID, InvalidUUIDException>(
        () => UUID.from(dto.id))
    if (id instanceof BaseException) {
        errors.push(id)
    }

    const url = wrapType<ValidURL, InvalidURLException>(
        () => ValidURL.from(dto.url))
    if (url instanceof BaseException) {
        errors.push(url)
    }

    const type = wrapType<ReportType, ReportTypeException>(
        () => ReportType.from(dto.type))
    if (type instanceof BaseException) {
        errors.push(type)
    }

    const creationDate = wrapType<ValidDate, InvalidDateException>(
        () => ValidDate.from(dto.creationDate))
    if (creationDate instanceof BaseException) {
        errors.push(creationDate)
    }

    return {
        errors,
        data: {
            id: id as UUID,
            url: url as ValidURL,
            type: type as ReportType,
            creationDate: creationDate as ValidDate
        }
    }
}
