import { Test, TestingModule } from '@nestjs/testing';
import { RegisterAuthService } from './register-auth.service';

describe('RegisterAuthService', () => {
  let service: RegisterAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterAuthService],
    }).compile();

    service = module.get<RegisterAuthService>(RegisterAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
