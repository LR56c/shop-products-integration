import { Injectable } from '@nestjs/common'
import { Product } from 'features/products/domain/models/Product'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'

@Injectable()
export class GetAllProductsService {
  constructor (private repository: ProductRepository) {}
  async getAll(from: ValidInteger, to: ValidInteger) : Promise<Product[]> {
    return this.repository.getAll(from, to)
  }
}
