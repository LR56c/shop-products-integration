import { Test, TestingModule } from '@nestjs/testing';
import { ApplyItemConfirmedService } from './apply-item-confirmed.service';

describe('ApplyItemConfirmedService', () => {
  let service: ApplyItemConfirmedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplyItemConfirmedService],
    }).compile();

    service = module.get<ApplyItemConfirmedService>(ApplyItemConfirmedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
