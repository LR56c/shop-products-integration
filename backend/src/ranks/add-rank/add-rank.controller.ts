import {
  Body,
  Controller,
  Post
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AddRankService } from './add-rank.service';

@ApiTags('ranks')
@Controller('ranks')
export class AddRankController {
  constructor(private readonly addRankService: AddRankService) {}

  @Post()
  async handle(@Body() data: any) {
    return true
  }
}
