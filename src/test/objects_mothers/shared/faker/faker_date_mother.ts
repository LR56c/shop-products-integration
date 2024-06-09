import { faker } from '@faker-js/faker'

export class FakerDateMother {
	static randomBetween( options: { from: Date, to: Date } ): Date {
		return faker.date.between( options )
	}

	static randomNearFuture( options?: {
		days?: number
		refDate?: Date
	} ): Date {
		return faker.date.soon( options )
	}

	static randomNearPast( options?: {
		days?: number
		refDate?: Date
	} ): Date {
		return faker.date.recent( options )
	}
}
