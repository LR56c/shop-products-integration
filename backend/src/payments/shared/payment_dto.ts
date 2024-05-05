import {IsBoolean, IsDate, IsInt, IsString, IsUUID} from "class-validator";

export class PaymentDto {
    @IsUUID()
    id: string

    @IsDate()
    creationDate: Date

    @IsBoolean()
    approved: boolean

    @IsString()
    deliveryName: string

    @IsInt()
    paymentValue: number

    @IsString()
    paymentMethod: string

}