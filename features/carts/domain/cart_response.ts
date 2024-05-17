import {Email} from "../../shared/domain/value_objects/Email";
import {ValidInteger} from "../../shared/domain/value_objects/ValidInteger";
import {Product} from "../../products/domain/models/product";

export class CartResponse {
    constructor(
        readonly userEmail: Email,
        readonly products: CartProductResponse[]
    ) {}
}

export class CartProductResponse{
    constructor(
        readonly quantity: ValidInteger,
        readonly product: Product
    ) {}
}
