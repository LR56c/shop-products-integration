import { Test, TestingModule } from '@nestjs/testing';
import { GetItemConfirmedService } from './get-item-confirmed.service';

describe('GetItemConfirmedService', () => {
  let service: GetItemConfirmedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetItemConfirmedService],
    }).compile();

    service = module.get<GetItemConfirmedService>(GetItemConfirmedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
