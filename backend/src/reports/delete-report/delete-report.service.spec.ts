import { Test, TestingModule } from '@nestjs/testing';
import { DeleteReportService } from './delete-report.service';

describe('DeleteReportService', () => {
  let service: DeleteReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteReportService],
    }).compile();

    service = module.get<DeleteReportService>(DeleteReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
