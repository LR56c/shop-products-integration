import { faker } from '@faker-js/faker'

export class FakerAlphanumericMother {
	static random( options?: {
		length?: number | {
			min: number;
			max: number;
		};
		casing?: 'lower' | 'upper' | 'mixed';
	} ): string {
		return faker.string.alphanumeric( {
			length : options?.length,
			casing : options?.casing,
			exclude: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]
		} )
	}
}
