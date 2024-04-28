import { Test, TestingModule } from '@nestjs/testing';
import { GetAllRankByCodeController } from './get-all-rank-by-code.controller';
import { GetAllRankByCodeService } from './get-all-rank-by-code.service';

describe('GetAllRankByCodeController', () => {
  let controller: GetAllRankByCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllRankByCodeController],
      providers: [GetAllRankByCodeService],
    }).compile();

    controller = module.get<GetAllRankByCodeController>(GetAllRankByCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
