import { Injectable } from '@nestjs/common';
import { Product } from 'features/products/domain/models/Product';
import { GetAllProducts } from '~features/products/application/get_all_products'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
@Injectable()
export class GetAllProductsService {
  constructor (private repository: ProductRepository) {}
  async getAll(from: number, to: number) : Promise<Product[]> {
    return GetAllProducts(this.repository, {
      from: from,
      to: to
    })
  }
}
