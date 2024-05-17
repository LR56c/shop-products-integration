import {ValidInteger} from "../../shared/domain/value_objects/ValidInteger";
import {Product} from "../../products/domain/models/product";

export class CartProductResponse{
    constructor(
        readonly quantity: ValidInteger,
        readonly product: Product
    ) {}
}
