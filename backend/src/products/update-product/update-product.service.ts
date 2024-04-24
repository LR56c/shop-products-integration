import { Injectable } from '@nestjs/common';
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger';
import { ValidString } from '~features/shared/domain/value_objects/ValidString';
import { ProductRepository } from '../domain/repository/product_repository';
@Injectable()
export class UpdateProductService {
    constructor(private repository: ProductRepository){
    }
    async updateProduct(arg0: ValidString, arg1: ValidInteger): Promise<boolean> {
        return this.repository.updateProduct(arg0, arg1);
    }
}
