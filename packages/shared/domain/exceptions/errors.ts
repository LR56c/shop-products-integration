import { BaseException } from './BaseException'

export class Errors {
	constructor( readonly values: BaseException[] ) {}
}
