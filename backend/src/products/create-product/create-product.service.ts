import { CreateProduct } from '~features/products/application/create_product'
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '~features/products/domain/repository/product_repository';

@Injectable()
export class CreateProductService {
    constructor( private repository: ProductRepository) {}

    async createProduct(props: {
        code: string;
        product_code: string;
        name: string;
        description: string;
        brand: string;
        image_url: string;
        rank: string;
        price: number;
        stock: number;
        category_name: string;
    }): Promise<boolean> {
        return CreateProduct(this.repository, {
            code: props.code,
            product_code: props.product_code,
            name: props.name,
            description: props.description,
            brand: props.brand,
            image_url: props.image_url,
            rank: props.rank,
            price: props.price,
            stock: props.stock,
            category_name: props.category_name
        });

    }


}
