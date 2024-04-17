import { FC, useState } from "react";
import {Password } from "@features/shared/domain/value_objects/Password"
import {PasswordError } from "@features/shared/domain/exceptions/PasswordException"
import { log } from "console";


interface TextFieldProps {
    className? : string;
    placeholder?: string;
    minimumLength?: number;
    type?: 'text' | 'email' | 'password' | 'number';
    callback: (value : string | undefined) => void;}



export const TextFieldComponent: FC<TextFieldProps> = ({className, callback, placeholder="Input text", type="password"}) => {
    //logica
    const [errorMsg , setErrorMsg] = useState<string | undefined>(undefined)
    const [valueType , setValueType] = useState<string | undefined>(undefined)

    const handleChange = (value : string) => {
        switch (type) {
            case "password":
                try{
                    const result = Password.from(value)
                    setErrorMsg(undefined)
                    setValueType(result.value)
                }catch(e : unknown) {
                    if(e instanceof Error && e.message === PasswordError.name) {
                        setErrorMsg("Constraseña Invalida")
                        setValueType(undefined)
                    }
                }
                break;
                default:
                    console.log("default")
                    break;
                }
                callback(valueType)    
                
                
    }
    return(
        <>
            <div className="bg-primary-500 rounded-md inline-flex display-block">
            
                <input  
                    className={` rounded-md m-0.5 ${className}`}
                    onChange={(e)=>handleChange(e.currentTarget.value)}
                    placeholder={`  ${placeholder}`}
                    type={` ${type}`}
                    />
            </div>
                    <div>{errorMsg}</div>
                
                

            
        </>)
    
}