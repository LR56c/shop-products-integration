import { Test, TestingModule } from '@nestjs/testing';
import { DeleteAuthService } from './delete-auth.service';

describe('DeleteAuthService', () => {
  let service: DeleteAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteAuthService],
    }).compile();

    service = module.get<DeleteAuthService>(DeleteAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
