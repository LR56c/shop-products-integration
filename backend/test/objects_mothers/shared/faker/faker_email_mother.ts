import { faker } from '@faker-js/faker'

export class FakerEmailMother {
	static random(): string {
		return faker.internet.email()
	}
}
