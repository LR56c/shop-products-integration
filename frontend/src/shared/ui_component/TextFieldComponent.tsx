import {
	ChangeEvent,
	FC,
	useState
} from 'react'
import { Password } from '@features/shared/domain/value_objects/Password'
import { PasswordError } from '@features/shared/domain/exceptions/PasswordException'
import {
	Path,
	UseFormRegister
} from 'react-hook-form'

interface TextFieldProps {
	className?: string,
	placeholder?: string,
	minimumLength?: number,
	type?: 'text' | 'email' | 'password' | 'number',
	label: Path<string>,
	register: UseFormRegister<any>,
}


export const TextFieldComponent: FC<TextFieldProps> = ( {
	className,
	placeholder = 'Input text',
	type = 'password',
	label,
	register,
} ) => {
	const [ errorMsg, setErrorMsg ] = useState<string | null>( null )
	const [ valueType, setValueType ] = useState<string | null>( null )

	const handleChange = ( element: ChangeEvent<HTMLInputElement> ) => {
		switch ( type ) {
			case 'password':
				try {
					const result = Password.from( element.currentTarget.value )
					setErrorMsg( null )
					setValueType( result.value )
				}
				catch ( e: unknown ) {
					if ( e instanceof Error && e.message === PasswordError.name ) {
						setErrorMsg( 'Constraseña Invalida' )
						setValueType( null )
					}
				}
				break
			default:
				console.log( 'default' )
				break
		}
	}
	return (
		<>
			<div className="bg-primary-500 rounded-md inline-flex display-block">
				<input
					{ ...register( `${ label }` ) }
					onChange={ handleChange }
					className={ ` rounded-md m-0.5 ${ className }` }
					placeholder={ `  ${ placeholder }` }
					type="text"
				/>
			</div>
			<div>{ errorMsg }</div>
		</> )
}
