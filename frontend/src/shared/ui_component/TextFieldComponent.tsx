import { FC } from "react";


interface TextFieldProps {
    className? : string;
    placeholder?: string;
    minimumLength?: number;
    type?: 'text' | 'email' | 'password' | 'number';
    callback?: () => string | null;
}



export const TextFieldComponent: FC<TextFieldProps> = ({className, placeholder="Input text", type="text"}) => {
    return(
        <>
            <div className="bg-primary-500 rounded-md inline-flex display-block">
                <input  
                    className={` rounded-md m-0.5 ${className}`}
                    placeholder={`  ${placeholder}`}
                    type={` ${type}`}
                    />
            </div>
                
                

            
        </>)
    
}