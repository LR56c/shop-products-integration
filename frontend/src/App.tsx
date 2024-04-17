import './App.css'
import {Select} from "./shared/ui_component/Select.tsx";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";

function App() {

    const m = [
        {id: "1", name: "Afganistán"},
        {id: "2", name: "Albania"},
        {id: "3", name: "Alemania"},
        {id: "4", name: "Andorra"},
        {id: "5", name: "Angola"},
        {id: "6", name: "Antigua y Barbuda"},
        {id: "7", name: "Arabia Saudita"},
        {id: "8", name: "Argelia"},
        {id: "9", name: "Argentina"},
        {id: "10", name: "Armenia"},
        {id: "11", name: "Australia"},
        {id: "12", name: "Austria"},
        {id: "13", name: "Azerbaiyán"},
        {id: "14", name: "Bahamas"},
        {id: "15", name: "Bangladés"},
        {id: "16", name: "Barbados"},
        {id: "17", name: "Baréin"},
        {id: "18", name: "Bélgica"},
        {id: "19", name: "Belice"},
        {id: "20", name: "Benín"},
        {id: "21", name: "Bielorrusia"},
        {id: "22", name: "Birmania"},
        {id: "23", name: "Bolivia"},
        {id: "24", name: "Bosnia y Herzegovina"},
        {id: "25", name: "Botsuana"},
        {id: "26", name: "Brasil"},
        {id: "27", name: "Brunéi"},
        {id: "28", name: "Bulgaria"},
        {id: "29", name: "Burkina Faso"},
        {id: "30", name: "Burundi"},
        {id: "31", name: "Bután"}

    ]
  return (
    <>
      <Select
          callback={(id)=>{
              console.log(id)
          }}
          entries={m}
          leadingOff={
          <IoIosArrowDown className="text-2xl" />
      }
          leadingOn={
          <IoIosArrowUp className="text-2xl"/>
      }
      />
    </>
  )
}

export default App

