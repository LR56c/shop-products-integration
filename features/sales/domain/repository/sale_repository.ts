import { UUID } from "../../../shared/domain/value_objects/UUID";
import { ValidInteger } from "../../../shared/domain/value_objects/ValidInteger";
import { ValidString } from "../../../shared/domain/value_objects/ValidString";
import { Sale } from '../models/sale';

export abstract class SaleRepository {
    abstract createSale(sale: Sale) : Promise<boolean>
    abstract modifySale(code : UUID) : Promise<boolean>
    abstract deleteSale(code : UUID) : Promise<boolean>
    abstract getAll(name : ValidString, from : ValidInteger, to: ValidInteger) : Promise<Sale[]>
    abstract getProductSale(product_code: ValidString) : Promise<Sale>

}