import { Injectable } from '@nestjs/common';
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { ValidString } from '~features/shared/domain/value_objects/ValidString';
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger';

@Injectable()
export class SearchProductService {
    constructor(private repository: ProductRepository) {}

    async searchProduct(name: ValidString, from: ValidInteger, to: ValidInteger) {
        return this.repository.searchProduct(name, from, to);
    }
}
