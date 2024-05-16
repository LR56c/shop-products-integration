import { useForm } from '@tanstack/react-form'
import {
	createFileRoute,
} from '@tanstack/react-router'
import { TextField, TextFieldValidation } from '../shared/ui_component/TextField'
import { useProducts } from '../shared/hooks/useProducts'

export const Route = createFileRoute( '/' )( {
	component: Index
} )

function Index() {


	const { Field, handleSubmit } = useForm( {
		defaultValues: {
			password : '',
			isChecked: false
		},
		onSubmit     : async ( { value } ) => {
			console.log( value )
		}
	} )

	const { products } = useProducts()

	return (
		<>
			<div>hola</div>
			<div>data: {products.length}</div>
			<form onSubmit={ ( e ) => {
				e.preventDefault()
				handleSubmit()
			} }>
				<Field
					name="password"
					validators={
						{
							onChange: ( { value } ) => TextFieldValidation( 'password',
								value )
						}
					}
					children={ ( { state, handleChange } ) => (
						<TextField
							errMsg={ state.meta.errors.join() }
							onChange={ handleChange }
							value={ state.value }
						/>
					) }
				/>
				<button>Submit</button>
			</form>
		</>
	)
}
