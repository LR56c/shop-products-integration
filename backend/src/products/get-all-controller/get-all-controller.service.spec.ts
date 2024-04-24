import { Test, TestingModule } from '@nestjs/testing';
import { GetAllControllerService } from './get-all-controller.service';

describe('GetAllControllerService', () => {
  let service: GetAllControllerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllControllerService],
    }).compile();

    service = module.get<GetAllControllerService>(GetAllControllerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
