import { PartialType } from '@nestjs/mapped-types'
import { ProductDto } from './product_dto'

export class PartialProductDto extends PartialType( ProductDto ) {}
