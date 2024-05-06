import {
  Controller,
  Delete,
  HttpStatus
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { DeleteReportService } from './delete-report.service';

@ApiTags( 'reports' )
@Controller( 'reports' )
export class DeleteReportController {
  constructor(private readonly deleteReportService: DeleteReportService) {}

  @Delete()
  async deleteReport() : Promise<HttpResult> {
    return {
      statusCode: HttpStatus.OK,
    }
  }
}
