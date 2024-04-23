import { Test, TestingModule } from '@nestjs/testing';
import { ReportsTypesController } from './reports_types.controller';
import { ReportsTypesService } from './reports_types.service';

describe('ReportsTypesController', () => {
  let controller: ReportsTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsTypesController],
      providers: [ReportsTypesService],
    }).compile();

    controller = module.get<ReportsTypesController>(ReportsTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
