import './App.css'
import {
	useForm
} from 'react-hook-form'
import { TextFieldComponent } from './shared/ui_component/TextFieldComponent'

function App() {

	const {
		      register,
		      handleSubmit,
	      }        = useForm()
	const onSubmit = handleSubmit( ( data ) => {
		console.log( data )
	} )

	return (
		<>
			<form onSubmit={ onSubmit }>
				<TextFieldComponent
					register={ register }
					label="password"/>
				<button type="submit">Submit</button>
			</form>
		</>
	)
}

export default App
