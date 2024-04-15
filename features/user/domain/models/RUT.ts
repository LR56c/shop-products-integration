import { InvalidRUTError } from 'features/shared/domain/exceptions/InvalidRUTException'
import { z } from 'zod'

export class RUT{
			private readonly value: string;

		private constructor(value: string) {
				this.value = value;
		}

	static from(value: string): RUT {
			const result = z.string().regex(/\b[0-9|.]{1,10}-{1}[K|k|0-9]{1}$/).safeParse(value)
			if (!result.success) {
					throw new InvalidRUTError()
			}
			return new RUT(value);
	}
}
