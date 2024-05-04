import { Injectable } from '@nestjs/common'
import { Product } from 'features/products/domain/models/Product'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'

@Injectable()
export class GetAllProductsService {
  constructor (private repository: ProductRepository) {}
  async getAll(from: ValidInteger, to: ValidInteger, name ?: ValidString) : Promise<Product[]> {
    return this.repository.getAll(from, to, name)
  }
}
