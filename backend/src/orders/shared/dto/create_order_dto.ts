import { OmitType } from '@nestjs/mapped-types'
import { OrderDto } from './order_dto'

export class CreateOrderDto extends OmitType( OrderDto, [ 'creation_date' ] ) {}
