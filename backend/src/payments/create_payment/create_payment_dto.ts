import {IsBoolean, IsDate, IsEnum, IsInt, IsString, IsUUID} from "class-validator";
import {PaymentMethodEnum} from "~features/payments/domain/models/payment_method";

export class CreatePaymentDto {
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

    @IsEnum(PaymentMethodEnum)
    paymentMethod: string

}