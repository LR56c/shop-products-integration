import {FC, JSX} from "react";

export const Button:FC<ButtonProps> =  ({name,callback,className,leading,action,size}) => {
    return (
       <>
           {size === "icon" ? <button className={`flex items-center justify-center rounded-full w-10 font-semibold h-10 
           ${className}`} onClick={callback}>
               {leading}
           </button> : null}

           {size === "sm" ? <button className={`flex items-center justify-center rounded-sm w-20 font-semibold h-10 
           ${className}`} onClick={callback}>
               {name}
           </button> : null}

           {size === "md" ? <button className={`flex items-center rounded-sm w-32 md:w-36 lg:w-40 font-semibold h-10 
           ${className}`} onClick={callback}>
               <div className="basis-[10.0%]"></div>
               <div className={"basis-[10.0%]"}>
                   {leading}
               </div>
               <div className={"basis-[60.0%]"}>
                   {name}
               </div>
               <div className={"basis-[10.0%]"}>
                   {action}
               </div>
               <div className="basis-[10.0%]"></div>
           </button> : null}

           {size === "lg" ? <button className={`flex items-center rounded-sm w-60 font-semibold h-10 
           ${className}`} onClick={callback}>
               <div className="basis-[5.0%]"></div>
               <div className={""}>
                   {leading}
               </div>
               <div className={"basis-[80.0%]"}>
                   {name}
               </div>
               <div className={""}>
                   {action}
               </div>
               <div className={""}></div>
           </button> : null}
       </>
    );
};

interface ButtonProps {
    name?: string,
    callback: FunctionVoid,
    className?: string,
    leading?: JSX.Element,
    action?: JSX.Element,
    size: "md" | "sm" | "lg"| "icon",
}