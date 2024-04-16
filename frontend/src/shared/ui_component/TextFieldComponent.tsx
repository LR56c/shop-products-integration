import { FC } from "react";


interface TextFieldProps {
    className? : string;
    placeholder?: string;
    cols? : number;
    rows? : number;
}

export const TextFieldComponent: FC<TextFieldProps> = ({className, placeholder="Input text"}) => {
    return(
        <>
            <div className="bg-primary-500 rounded-xl">
                <textarea  
                    className={`rounded-xl ${className}`}
                    placeholder={`${placeholder}`}
                    cols={35}
                    rows={5}>
                </textarea>
            </div>
                
                

            
        </>)
    
}