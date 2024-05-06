import { Test, TestingModule } from '@nestjs/testing';
import { DeleteReportController } from './delete-report.controller';
import { DeleteReportService } from './delete-report.service';

describe('DeleteReportController', () => {
  let controller: DeleteReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteReportController],
      providers: [DeleteReportService],
    }).compile();

    controller = module.get<DeleteReportController>(DeleteReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
