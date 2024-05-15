import { PartialType } from '@nestjs/mapped-types'
import { OrderDto } from 'src/orders/dto/order_dto'

export class PartialOrderDto extends PartialType(OrderDto){}
