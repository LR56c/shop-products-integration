import { z } from 'zod'
import { ReportTypeException } from '../exception/ReportTypeException'

export enum ReportTypeEnum {
	performance = 'PERFORMANCE',
	sale        = 'SALE',
}

export class ReportType {

	readonly value: ReportTypeEnum

	private constructor( value: ReportTypeEnum ) {
		this.value = value
	}

	static from( value: string ): ReportType {
		const result = z.nativeEnum( ReportTypeEnum )
		                .safeParse( value )
		if ( result.success === false ) {
			throw new ReportTypeException()
		}
		return new ReportType( result.data )
	}
}
