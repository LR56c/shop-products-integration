import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { RemoveNewsLetterService } from './remove-news-letter.service';

@ApiTags('news-letters')
@Controller('news-letters')
export class RemoveNewsLetterController {
  constructor(private readonly removeNewsLetterService: RemoveNewsLetterService) {}
}
