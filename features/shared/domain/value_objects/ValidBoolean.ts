import { InvalidBooleanException } from '../exceptions/InvalidBooleanException'
import { z } from 'zod'

export class ValidBoolean {
    readonly value: boolean

    private constructor( value: boolean ) {
        this.value = value
    }

    /**
     * Create a ValidBoolean instance
     * @throws {InvalidBooleanException} - if string is invalid
     */
    static from( value: boolean ): ValidBoolean {
        const result = z.boolean().safeParse( value )
        if ( result.success === false ) {
            throw new InvalidBooleanException()
        }
        return new ValidBoolean( result.data )
    }
}
