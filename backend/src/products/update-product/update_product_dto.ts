import { OmitType } from '@nestjs/mapped-types'
import { ProductDto } from 'src/products/shared/dto/product_dto'

export class UpdateProductDto extends OmitType(ProductDto, ['id', 'created_at', 'average_rank', 'sale']){

}
