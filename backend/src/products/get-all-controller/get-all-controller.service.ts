import { Injectable } from '@nestjs/common';
import { Product } from 'features/products/domain/models/Product';
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger';
import { ProductRepository } from '../domain/repository/product_repository';
@Injectable()
export class GetAllControllerService {
  constructor (private repository: ProductRepository) {}
  async getAll(from: ValidInteger, to: ValidInteger) : Promise<Product[]> {
    return this.repository.getAll(from, to);
  }
}
