import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { AddNewsLetterService } from './add-news-letter.service';

@ApiTags('news-letters')
@Controller('news-letters')
export class AddNewsLetterController {
  constructor(private readonly addNewsLetterService: AddNewsLetterService) {}
}
