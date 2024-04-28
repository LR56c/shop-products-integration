import {
  Controller,
  Get,
  Param
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { GetAllRankByCodeService } from './get-all-rank-by-code.service';

@ApiTags('ranks')
@Controller('ranks')
export class GetAllRankByCodeController {
  constructor(private readonly getAllRankByCodeService: GetAllRankByCodeService) {}

  @Get(':code')
  async handle(@Param('code') code: string) {
    return await this.getAllRankByCodeService.execute(code)
  }
}
