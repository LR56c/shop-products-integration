import {
    IsBoolean,
    IsDate,
    IsInt,
    IsString,
    IsUUID,
    Min,
    MinLength
} from 'class-validator'

export class PaymentDto {
    @IsUUID()
    id: string

    @IsDate()
    created_at: Date

    @IsBoolean()
    approved: boolean

    @MinLength(1)
    @IsString()
    delivery_address: string

    @Min(1)
    @IsInt()
    value: number

    @MinLength(1)
    @IsString()
    payment_method: string

}
