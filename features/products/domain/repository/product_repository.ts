import { ValidRank } from '../../../shared/domain/value_objects/ValidRank'
import { ValidInteger } from "../../../shared/domain/value_objects/ValidInteger"
import { ValidString } from "../../../shared/domain/value_objects/ValidString"
import { Product } from "../models/Product"
export abstract class ProductRepository {
    abstract createProduct(product: Product): Promise<boolean>
    abstract getAll(from: ValidInteger, to: ValidInteger): Promise<Product[]>
    abstract getProduct(code: ValidString): Promise<Product>
    abstract updateProduct(code: ValidString, product : Product ): Promise<boolean>
    abstract deleteProduct(code: ValidString): Promise<boolean>
    abstract deleteAll(): Promise<boolean>
    abstract searchProduct(name: ValidString, from: ValidInteger, to: ValidInteger): Promise<Product[]>
    abstract getRecommendProductsGroupByCategory(threshold: ValidRank, products: Product[] ,limit: ValidInteger): Promise<Map<string, Product[]>>
}
