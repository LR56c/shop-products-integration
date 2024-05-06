import {IsBoolean, IsDate, IsEnum, IsInt, IsString, IsUUID} from "class-validator";
import {PaymentMethodEnum} from "~features/payments/domain/models/payment_method";
import {PaymentDto} from "../shared/payment_dto";

export class CreatePaymentDto extends PaymentDto{

}