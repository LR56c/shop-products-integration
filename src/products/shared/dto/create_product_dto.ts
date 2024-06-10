import { OmitType } from '@nestjs/mapped-types'
import { ProductDto } from './product_dto'

export class CreateProductDto extends OmitType( ProductDto,
	[ 'created_at', 'average_rank', 'discount' ] )
{}
