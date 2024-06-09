import { RUT } from '~features/user/domain/models/RUT'

export class RUTMother {
	static random(): RUT {
		return RUT.from('12345678-5')
	}
	static invalid(): RUT {
		return RUT.from('12345678-9')
	}
}
