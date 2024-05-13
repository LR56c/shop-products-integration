import { Test, TestingModule } from '@nestjs/testing';
import { RefreshAuthService } from './refresh-auth.service';

describe('RefreshAuthService', () => {
  let service: RefreshAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshAuthService],
    }).compile();

    service = module.get<RefreshAuthService>(RefreshAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
