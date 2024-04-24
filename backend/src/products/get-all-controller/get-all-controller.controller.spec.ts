import { Test, TestingModule } from '@nestjs/testing';
import { GetAllControllerController } from './get-all-controller.controller';
import { GetAllControllerService } from './get-all-controller.service';

describe('GetAllControllerController', () => {
  let controller: GetAllControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllControllerController],
      providers: [GetAllControllerService],
    }).compile();

    controller = module.get<GetAllControllerController>(GetAllControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
