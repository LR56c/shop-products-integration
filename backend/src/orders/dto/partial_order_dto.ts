import { OmitType } from '@nestjs/mapped-types'
import { OrderDto } from './order_dto'

export class PartialOrderDto extends OmitType( OrderDto,
	[ 'id', 'creation_date' ] as const )
{}
