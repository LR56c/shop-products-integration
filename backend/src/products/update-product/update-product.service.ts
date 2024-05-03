import { Injectable } from '@nestjs/common';
import { Product } from '~features/products/domain/models/product'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
@Injectable()
export class UpdateProductService {
    constructor(private repository: ProductRepository){
    }
    async updateProduct(product: Product): Promise<boolean> {
        return this.repository.updateProduct(product)
    }
}
