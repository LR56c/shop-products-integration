import { OmitType } from '@nestjs/mapped-types'
import { RankDto } from 'src/ranks/dto/rank_dto'

export class UpdateRankDto extends OmitType( RankDto, [ 'created_at' ] ) {}
