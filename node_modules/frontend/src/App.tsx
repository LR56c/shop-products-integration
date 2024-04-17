import './App.css'
import { TextFieldComponent } from './shared/ui_component/TextFieldComponent'

function App() {


  return (
    <>
        <TextFieldComponent
        callback={(value)=>{
          console.log("padre: " + value)
        }}/>
    </>
  )
}

export default App
