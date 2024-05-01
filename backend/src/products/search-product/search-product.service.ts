import { Injectable } from '@nestjs/common';
import { SearchProductByName } from '~features/products/application/search_product_by_name'
import { ProductRepository } from '~features/products/domain/repository/product_repository'

@Injectable()
export class SearchProductService {
    constructor(private repository: ProductRepository) {}

    async searchProduct(name: string, from: number, to: number) {
        return SearchProductByName(this.repository, {
            name,
            from,
            to
        })
    }
}
