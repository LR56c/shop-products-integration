import { Injectable } from '@nestjs/common';
import { Product } from '~features/products/domain/models/product'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'
@Injectable()
export class UpdateProductService {
    constructor(private repository: ProductRepository){
    }
    async updateProduct(id: UUID, product: Product): Promise<boolean> {
        return this.repository.updateProduct(id, product)
    }
}
