import {
	ChangeEvent,
	FC,
	useEffect,
	useState
} from 'react'
import { Password } from '@features/shared/domain/value_objects/Password'
import { PasswordError } from '@features/shared/domain/exceptions/PasswordException'


interface TextFieldProps {
	className?: string;
	placeholder?: string;
	minimumLength?: number;
	type?: 'text' | 'email' | 'password' | 'number';
	callback: ( value: string | null ) => void;
}


export const TextFieldComponent: FC<TextFieldProps> = ( {
	className,
	callback,
	placeholder = 'Input text',
	type = 'password'
} ) => {
	//logica
	const [ errorMsg, setErrorMsg ] = useState<string | null>( null )
	const [ valueType, setValueType ] = useState<string | null>( null )

	useEffect(
		()=>{
			callback(valueType)
		},
	[valueType]
	)

	const handleChange = ( element : ChangeEvent<HTMLInputElement> ) => {
		switch ( type ) {
			case 'password':
				try {
					const result = Password.from( element.currentTarget.value )
					setErrorMsg(null)
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
					className={ ` rounded-md m-0.5 ${ className }` }
					onChange={ ( e ) => handleChange( e ) }
					placeholder={ `  ${ placeholder }` }
					type="text"
					// type={` ${type}`}
				/>
			</div>
			<div>{ errorMsg }</div>
		</> )
}
