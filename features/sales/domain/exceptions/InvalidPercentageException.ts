import { BaseException } from "../../../shared/domain/exceptions/BaseException";
export class InvalidPercentageException extends BaseException {
    constructor(message?: string, readonly value?: string) {
        super(message != null ? message : "invalid.percentage", value)
        this.name = "InvalidPercentage"
    }
}