import { PartialType } from '@nestjs/mapped-types'
import { ProductDto } from 'src/products/shared/dto/product_dto'

export class PartialProductDto extends PartialType( ProductDto ) {}
