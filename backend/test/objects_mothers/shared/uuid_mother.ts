import { UUID } from '~features/shared/domain/value_objects/uuid'

export class UUIDMother{
	static random(): UUID {
		return UUID.create()
	}
	static invalid(): UUID {
		return UUID.from('')
	}
}
