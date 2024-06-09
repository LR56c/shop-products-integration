import { faker } from '@faker-js/faker'

export class FakerNumberTextMother {
	/**
	 * Random number text with length between min and max
	 */
	static random( options?: number | {
		length?: number | {
			min: number;
			max: number;
		};
	} ): string {
		return faker.string.numeric( options )
	}
}
