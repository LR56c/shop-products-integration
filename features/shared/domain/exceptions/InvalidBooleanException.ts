import { BaseException } from './BaseException'

export class InvalidBooleanException extends BaseException {
    constructor(readonly field?: string, message?: string, readonly value?: string) {
        super( `invalid.boolean${message != null ? `.${message}`:''}`, value, field)
        this.name = "InvalidBooleanException"
    }
}
