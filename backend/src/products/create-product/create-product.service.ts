import { Injectable } from '@nestjs/common';
import { Product } from '~features/products/domain/models/product'
import { ProductRepository } from '~features/products/domain/repository/product_repository';

@Injectable()
export class CreateProductService {
    constructor( private repository: ProductRepository) {}

    async createProduct(product : Product): Promise<boolean> {
        return this.repository.createProduct(product)
    }
}
