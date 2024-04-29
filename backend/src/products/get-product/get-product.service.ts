import { Injectable } from '@nestjs/common';
import { Product } from '~features/products/domain/models/product';
import { GetProductByCode } from '~features/products/application/get_product_by_code'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
@Injectable()
export class GetProductService {
    constructor (private repository: ProductRepository) {
    }
    getProduct(code : string) : Promise<Product> {
        return GetProductByCode(this.repository, {
            code: code
        })
    }
}
