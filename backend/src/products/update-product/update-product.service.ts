import { Injectable } from '@nestjs/common';
import { Product } from '~features/products/domain/models/product'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
@Injectable()
export class UpdateProductService {
    constructor(private repository: ProductRepository){
    }
    async updateProduct(product_code : ValidString, product: Product): Promise<boolean> {
        return this.repository.updateProduct(product_code, product)
    }
}
