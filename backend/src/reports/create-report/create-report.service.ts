import { Injectable } from '@nestjs/common';
import {ReportRepository} from "~features/report/domain/repository/report_repository";
import {ReportType} from "~features/report/domain/models/report_type";
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { ValidURL } from '~features/shared/domain/value_objects/ValidURL'
import { wrapType } from '~features/shared/utils/WrapType'

@Injectable()
export class CreateReportService {
    constructor(private readonly repo: ReportRepository) {}
    async createReport(type : ReportType): Promise<ValidURL> {
        //TODO: modificar
        const nameResult = wrapType<ValidString, InvalidStringException>(
          () => ValidString.from( '' ) )

        if ( nameResult instanceof BaseException ) {
            throw [ new InvalidStringException() ]
        }

        const data : Uint8Array = new Uint8Array()

        return this.repo.createReport(type, nameResult as ValidString, data)
    }
}
