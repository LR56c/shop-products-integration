import { Injectable } from '@nestjs/common';
import { Product } from 'features/products/domain/models/product';
import { ValidString } from '~features/shared/domain/value_objects/ValidString';
import { ProductRepository } from '../domain/repository/product_repository';
@Injectable()
export class GetProductService {
    constructor (private repository: ProductRepository) {
    }
    getProduct(arg0: ValidString) : Promise<Product> {
        return this.repository.getProduct(arg0);
    }
}
