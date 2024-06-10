import { FakerDateMother } from './faker/faker_date_mother'
import { ValidDate } from '../../../../packages/shared/domain/value_objects/valid_date'

export class ValidDateMother {
	static randomNearFuture( options?: {
		days?: number
		refDate?: Date
	} ): ValidDate {
		return ValidDate.from( FakerDateMother.randomNearFuture( options ) )
	}

	static randomBetween( options: {
		from: Date,
		to: Date
	} ): ValidDate {
		return ValidDate.from( FakerDateMother.randomBetween( options ) )
	}

	static randomNearPast( options?: {
		days?: number
		refDate?: Date
	} ): ValidDate {
		return ValidDate.from( FakerDateMother.randomNearPast( options ) )
	}

	static invalid(): ValidDate {
		return ValidDate.from( new Date( 'invalid' ) )
	}
}
