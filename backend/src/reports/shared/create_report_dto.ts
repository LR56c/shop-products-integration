import {IsDate, IsEnum, IsUrl, IsUUID} from "class-validator";
import {ReportTypeEnum} from "~features/report/domain/models/report_type";

export class CreateReportDto {
    @IsUUID()
    id: string

    @IsUrl()
    url: string

    @IsEnum(ReportTypeEnum)
    type: string

    @IsDate()
    creationDate: Date

}