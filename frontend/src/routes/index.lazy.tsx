import { createLazyFileRoute } from '@tanstack/react-router'
import {
	TextField,
	TextFieldValidation
} from '../shared/ui_component/TextField'
import { useForm } from '@tanstack/react-form'

export const Route = createLazyFileRoute('/')({
	component: IndexLazy,
})

function IndexLazy() {
	const { Field, handleSubmit, state } = useForm({
		defaultValues: {
			password: '',
			isChecked: false,
		},
		onSubmit: async ({ value}) => {
			console.log(value)
		},
	})

	return (
		<>
			<form onSubmit={ (e)=>{
					e.preventDefault()
					handleSubmit()
				} }>
				<Field
					name="password"
					validators={
					{
						onChange: ({value})=> TextFieldValidation('password', value),
					}
					}
					children={({state, handleChange}) =>(
						<TextField
							errMsg={state.meta.errors.join()}
							onChange={handleChange}
							value={state.value}
						/>
					)}
				/>
				<button>Submit</button>
			</form>
		</>
	)
}
