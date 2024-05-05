import {
  Controller,
  Get,
  HttpStatus
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { GetReportService } from './get-report.service';

@ApiTags( 'reports' )
@Controller( 'reports' )
export class GetReportController {
  constructor(private readonly getReportService: GetReportService) {}

 @Get()
  async getReport() : Promise<HttpResult> {
    return {
      statusCode: HttpStatus.OK,
    }
  }
}
