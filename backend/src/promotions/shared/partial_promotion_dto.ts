import { OmitType } from '@nestjs/mapped-types'
import { PromotionDto } from './promotion_dto';

export class PartialPromotionDto extends OmitType( PromotionDto,
	[ 'id' ] as const )
{}
