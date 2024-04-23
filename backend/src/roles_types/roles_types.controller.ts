import { Controller } from '@nestjs/common';
import { RolesTypesService } from './roles_types.service';

@Controller('roles-types')
export class RolesTypesController {
  constructor(private readonly rolesTypesService: RolesTypesService) {}
}
