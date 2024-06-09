import { OmitType } from '@nestjs/mapped-types'
import { RankDto } from 'src/ranks/dto/rank_dto'

export class CreateRankDto extends OmitType( RankDto,
	[ 'created_at' ] )
{}
