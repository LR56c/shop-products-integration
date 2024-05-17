import { BaseException } from '../../../shared/domain/exceptions/BaseException'

export class InsufficientStockException extends BaseException {
	constructor( message?: string, readonly value?: string ) {
		super( message != null ? message : 'invalid.stock', value )
		this.name = 'InsufficientStockException'
	}
}
