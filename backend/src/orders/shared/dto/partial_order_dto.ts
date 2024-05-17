import { PartialType } from '@nestjs/mapped-types'
import { OrderDto } from './order_dto'

export class PartialOrderDto extends PartialType( OrderDto ) {}
