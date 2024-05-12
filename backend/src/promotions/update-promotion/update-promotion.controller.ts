import { Controller } from '@nestjs/common';
import { UpdatePromotionService } from './update-promotion.service';

@Controller('update-promotion')
export class UpdatePromotionController {
  constructor(private readonly updatePromotionService: UpdatePromotionService) {}
}
