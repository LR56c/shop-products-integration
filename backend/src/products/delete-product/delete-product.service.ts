import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/repository/product_repository';
import { ValidString } from '~features/shared/domain/value_objects/ValidString';

@Injectable()
export class DeleteProductService {
    constructor(private repository: ProductRepository){
    }
    async deleteProduct(code: ValidString): Promise<boolean> {
        return await this.repository.deleteProduct(code);
    }
}
