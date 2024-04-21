import { Controller } from '@nestjs/common';
import { ReportsTypesService } from './reports_types.service';

@Controller('reports-types')
export class ReportsTypesController {
  constructor(private readonly reportsTypesService: ReportsTypesService) {}
}
