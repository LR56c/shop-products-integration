import { Injectable } from '@nestjs/common';
import { GetProduct } from '~features/products/application/get_product'
import { ProductResponse } from '~features/products/domain/models/product_response'
import { ProductRepository } from '~features/products/domain/repository/product_repository'

@Injectable()
export class GetProductService {
    constructor (private repository: ProductRepository) {
    }
    getProduct(id : string) : Promise<ProductResponse> {
        return GetProduct(this.repository, id)
    }
}
