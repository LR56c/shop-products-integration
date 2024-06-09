import { faker } from '@faker-js/faker'

export class FakerFirstNameMother {
	static random(): string {
		return faker.person.firstName()
	}
}
