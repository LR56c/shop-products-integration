import { Test, TestingModule } from '@nestjs/testing';
import { GetReportController } from './get-report.controller';
import { GetReportService } from './get-report.service';

describe('GetReportController', () => {
  let controller: GetReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetReportController],
      providers: [GetReportService],
    }).compile();

    controller = module.get<GetReportController>(GetReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
