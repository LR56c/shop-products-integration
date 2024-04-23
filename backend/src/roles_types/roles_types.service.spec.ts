import { Test, TestingModule } from '@nestjs/testing';
import { RolesTypesService } from './roles_types.service';

describe('RolesTypesService', () => {
  let service: RolesTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesTypesService],
    }).compile();

    service = module.get<RolesTypesService>(RolesTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
