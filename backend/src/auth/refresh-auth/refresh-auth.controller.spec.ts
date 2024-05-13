import { Test, TestingModule } from '@nestjs/testing';
import { RefreshAuthController } from './refresh-auth.controller';
import { RefreshAuthService } from './refresh-auth.service';

describe('RefreshAuthController', () => {
  let controller: RefreshAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefreshAuthController],
      providers: [RefreshAuthService],
    }).compile();

    controller = module.get<RefreshAuthController>(RefreshAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
