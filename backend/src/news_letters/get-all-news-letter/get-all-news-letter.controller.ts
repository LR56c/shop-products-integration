import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { GetAllNewsLetterService } from './get-all-news-letter.service';

@ApiTags('news-letters')
@Controller('news-letters')
export class GetAllNewsLetterController {
  constructor(private readonly getAllNewsLetterService: GetAllNewsLetterService) {}
}
