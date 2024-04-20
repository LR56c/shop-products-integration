import {FC, JSX, useEffect, useState} from "react";

export const Select:FC<SelectProps> = ({leadingOn,
                                           leadingOff,
                                           callback,
                                           entries = [],}) => {

    const [showList, setShowList] = useState(false)
    const [itemValue, setItemValue] = useState<string>("select item");
    const [leadingValue, setLeadingValue] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string| null >(null)

    const toggleList = () => {
        setShowList(!showList)
    }
    const validateSelection = () =>{
        itemValue === "select item" ? (
            setErrorMessage("Debe seleccionar un item")
        ) : (
            setErrorMessage(null)
        )
    }

    useEffect(() => {
        validateSelection()
    }, [itemValue, showList])
    

    return (
        <>
        <div className="w-60 h-24 space-y-2 font-semibold">
                <div className="flex justify-between items-center bg-primary-600 text-primary-50 p-2 rounded-md"
                onClick={() =>{
                    toggleList(),
                        setLeadingValue(!leadingValue)
                        validateSelection()}}>
                    {itemValue}
                    {leadingValue ? (
                        <span className="text-2xl">
                            {leadingOn}
                        </span>
                    ) :
                        <span className="text-2xl">
                            {leadingOff}
                        </span>}
                </div>
            {showList ? (
                <>
                    <ul className="bg-primary-600 text-primary-50 rounded-md overflow-y-auto max-h-32">
                        {entries.map((entry) => (
                            <li onClick={() => {
                                callback(entry.id),
                                    setItemValue(entry.name),
                                    toggleList(),
                                    setLeadingValue(!leadingValue)}}
                                key={entry.id}
                                className="p-2 text-sm hover:bg-primary-50 hover:text-primary-600">
                                {entry.name}
                            </li>
                        ))}
                    </ul>
                </>
            ) : <div>{errorMessage}</div>}
        </div>
        </>
    );
};

interface SelectProps {
    leadingOn?: JSX.Element;
    leadingOff?: JSX.Element;
    entries: { id: string, name: string }[];
    callback: (id :string)=>void;
    placeholder?: string;
}