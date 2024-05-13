import { Injectable } from '@nestjs/common';
import { Product } from '~features/products/domain/models/product';
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class GetProductService {
    constructor (private repository: ProductRepository) {
    }
    getProduct(id : UUID) : Promise<Product> {
        return this.repository.getProduct(id)
    }
}
