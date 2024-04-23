import { Test, TestingModule } from '@nestjs/testing';
import { RolesTypesController } from './roles_types.controller';
import { RolesTypesService } from './roles_types.service';

describe('RolesTypesController', () => {
  let controller: RolesTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesTypesController],
      providers: [RolesTypesService],
    }).compile();

    controller = module.get<RolesTypesController>(RolesTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
