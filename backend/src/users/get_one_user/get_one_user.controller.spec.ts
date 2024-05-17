import { Test, TestingModule } from '@nestjs/testing';
import { GetOneUserController } from './get_one_user.controller';
import { GetOneUserService } from './get_one_user.service';

describe('GetOneUserController', () => {
  let controller: GetOneUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetOneUserController],
      providers: [GetOneUserService],
    }).compile();

    controller = module.get<GetOneUserController>(GetOneUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
