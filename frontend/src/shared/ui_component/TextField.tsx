import { InvalidPasswordException } from '@features/user/domain/exceptions/PasswordException.ts'
import { Password } from '@features/user/domain/models/Password.ts'
import { FC } from 'react'

interface TextFieldProps {
	className?: string,
	placeholder?: string,
	value: string
	errMsg: string
	onChange: ( value: string ) => void
}

export type TextFieldType = 'text' | 'email' | 'password' | 'number'

export const TextField: FC<TextFieldProps> = ( {
	className,
	placeholder = 'Input text',
	errMsg,
	value,
	onChange
} ) => {

	return (
		<>
			<div className="bg-primary-500 rounded-md inline-flex display-block">
				<input
					value={ value }
					onChange={ ( e ) => onChange( e.currentTarget.value ) }
					className={ ` rounded-md m-0.5 ${ className }` }
					placeholder={ `  ${ placeholder }` }
					type="text"
				/>
			</div>
			<div>{ errMsg }</div>
		</> )
}

export const TextFieldValidation = ( type: TextFieldType,
	value: string ): string | undefined => {
	switch ( type ) {
		case 'password':
			try {
				Password.from( value )
			}
			catch ( e: unknown ) {
				if ( e instanceof Error && e.message ===
					InvalidPasswordException.name )
				{
					return 'Constraseña Invalida'
				}
			}
			break
		default:
			console.log( 'default' )
			break
	}
	return undefined
}
