import { PartialType } from '@nestjs/mapped-types'
import { PromotionDto } from 'src/promotions/shared/promotion_dto'

export class PartialPromotionDto extends PartialType( PromotionDto )
{}
