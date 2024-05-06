import { Test, TestingModule } from '@nestjs/testing';
import { CreateReportController } from './create-report.controller';
import { CreateReportService } from './create-report.service';

describe('CreateReportController', () => {
  let controller: CreateReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateReportController],
      providers: [CreateReportService],
    }).compile();

    controller = module.get<CreateReportController>(CreateReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
