import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { CheckNewsLetterService } from './check-news-letter.service';

@ApiTags('news-letters')
@Controller('news-letters')
export class CheckNewsLetterController {
  constructor(private readonly checkNewsLetterService: CheckNewsLetterService) {}
}
