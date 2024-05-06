import { Test, TestingModule } from '@nestjs/testing';
import { CreateReportService } from './create-report.service';

describe('CreateReportService', () => {
  let service: CreateReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateReportService],
    }).compile();

    service = module.get<CreateReportService>(CreateReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
