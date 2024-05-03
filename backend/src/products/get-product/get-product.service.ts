import { Injectable } from '@nestjs/common';
import { Product } from '~features/products/domain/models/product';
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
@Injectable()
export class GetProductService {
    constructor (private repository: ProductRepository) {
    }
    getProduct(code : ValidString) : Promise<Product> {
        return this.repository.getProduct(code)
    }
}
