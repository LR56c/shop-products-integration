import {RUT} from "./RUT";
import {ValidString} from "../../../shared/domain/value_objects/ValidString";
import {Email} from "../../../shared/domain/value_objects/Email";
import {Role} from "../../../shared/domain/value_objects/Role";

export class User{
    constructor(
        readonly rut: RUT,
        readonly name: ValidString,
        readonly email: Email,
        readonly role: Role
    ) {}
}