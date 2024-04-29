import { Injectable } from '@nestjs/common';
import { UpdateProduct } from '~features/products/application/update_product'
import { Product } from '~features/products/domain/models/product'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
@Injectable()
export class UpdateProductService {
    constructor(private repository: ProductRepository){
    }
    async updateProduct(product: Product): Promise<boolean> {
        return UpdateProduct(this.repository, product )
    }
}
