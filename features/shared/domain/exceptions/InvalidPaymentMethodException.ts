import {BaseException} from './baseException';

export class InvalidPaymentMethodException extends BaseException {
    constructor(message?: string, readonly value?: string) {
        super(message != null ? message : "invalid.payment.method", value)
        this.name = 'InvalidPaymentMethodException'
    }
}