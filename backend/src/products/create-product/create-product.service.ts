import { CreateProduct } from '~features/products/application/create_product'
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '~features/products/domain/repository/product_repository';

@Injectable()
export class CreateProductService {
    constructor( private repository: ProductRepository) {}

    async createProduct(props: {
        id: string;
        code: string;
        name: string;
        description: string;
        created_at: string;
        brand: string;
        image_url: string;
        rank: string;
        price: string;
        stock: string;
        category_name: string;
    }): Promise<boolean> {
        return CreateProduct(this.repository, {
            id: props.id,
            code: props.code,
            name: props.name,
            description: props.description,
            create_at: props.created_at,
            brand: props.brand,
            image_url: props.image_url,
            rank: props.rank,
            price: props.price,
            stock: props.stock,
            category_name: props.category_name
        });

    }


}
