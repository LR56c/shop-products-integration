import { InvalidRUTException } from 'features/user/domain/exceptions/InvalidRUTException'
import { z } from 'zod'

export class RUT{
			private readonly value: string;

		private constructor(value: string) {
				this.value = value;
		}

	/**
	 * Create a RUT instance
	 * @throws {InvalidRUTException} - if rut is invalid
	 */
	static from(value: string): RUT {
			const result = z.string().regex(/\b[0-9|.]{1,10}-{1}[K|k|0-9]{1}$/).safeParse(value)
			if (!result.success) {
					throw new InvalidRUTException()
			}
			return new RUT(value);
	}
}
