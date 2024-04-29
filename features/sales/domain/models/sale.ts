import { UUID } from "../../../shared/domain/value_objects/UUID";
import { ValidDate } from "../../../shared/domain/value_objects/ValidDate";
import { ValidString } from "../../../shared/domain/value_objects/ValidString";
import { Percentage } from "./Percentage";

export class Sale {
    constructor (
        readonly id : UUID,
        readonly percentage : Percentage,
        readonly product_code : ValidString,
        readonly creation_date : ValidDate,
        readonly start_date : ValidDate,
        readonly end_date : ValidDate
    ){}
}