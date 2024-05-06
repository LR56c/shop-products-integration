import { Test, TestingModule } from '@nestjs/testing';
import { GetReportService } from './get-report.service';

describe('GetReportService', () => {
  let service: GetReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetReportService],
    }).compile();

    service = module.get<GetReportService>(GetReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
