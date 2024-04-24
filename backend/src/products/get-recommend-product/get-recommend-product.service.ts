import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/repository/product_repository';
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger';
import { Product } from 'features/products/domain/models/product';
import { ValidRank } from 'features/products/domain/models/ValidRank';
@Injectable()
export class GetRecommendProductService {
    constructor(private repository: ProductRepository) {}
    
    async getRecommendProducts(threshold: ValidRank, products: Product[], from: ValidInteger, to: ValidInteger) {
        return this.repository.getRecommendProducts(threshold, products, from, to);
    }
}
