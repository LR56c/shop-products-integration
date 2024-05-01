import { BaseException } from './BaseException'

export class InvalidRoleException extends BaseException {
	constructor(message?: string, readonly value?: string) {
		super(message != null ? message : "invalid.role", value)
		this.name = 'InvalidRoleException'
	}
}

