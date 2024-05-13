import { Test, TestingModule } from '@nestjs/testing';
import { LoginAuthController } from './login-auth.controller';
import { LoginAuthService } from './login-auth.service';

describe('LoginAuthController', () => {
  let controller: LoginAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginAuthController],
      providers: [LoginAuthService],
    }).compile();

    controller = module.get<LoginAuthController>(LoginAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
