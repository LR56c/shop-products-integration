import { Test, TestingModule } from '@nestjs/testing';
import { ReportsTypesService } from './reports_types.service';

describe('ReportsTypesService', () => {
  let service: ReportsTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportsTypesService],
    }).compile();

    service = module.get<ReportsTypesService>(ReportsTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
