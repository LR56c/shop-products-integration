import { Module } from '@nestjs/common';
import { RolesTypesService } from './roles_types.service';
import { RolesTypesController } from './roles_types.controller';

@Module({
  controllers: [RolesTypesController],
  providers: [RolesTypesService],
})
export class RolesTypesModule {}
