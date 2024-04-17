import {FC, JSX, useState} from "react";

export const Select:FC<SelectProps> = ({leadingOn,leadingOff, callback, entries = []}) => {
    const [showList, setShowList] = useState(false)
    const [itemValue, setItemValue] = useState<string>("Select item");
    const [leadingValue, setLeadingValue] = useState(false)
1

    const toggleList = () => {
        setShowList(!showList)
    }

    return (
        <>
        <div className="w-60 h-24 space-y-2 font-semibold">
                <div className="flex justify-between items-center bg-gray-700 text-white p-2 rounded-md"
                onClick={() =>{
                    toggleList(),
                    setLeadingValue(!leadingValue)}}>
                    {itemValue}
                    {leadingValue ? (
                        <span>
                            {leadingOn}
                        </span>
                    ) :
                        <span>
                            {leadingOff}
                        </span>}
                </div>
            {showList ? (
                <>
                    <ul className="bg-gray-500 text-white rounded-md overflow-y-auto max-h-32">
                        {entries.map((entry) => (
                            <li onClick={()=>{callback(entry.id),
                                    setItemValue(entry.name),
                                    toggleList(),
                                    setLeadingValue(!leadingValue)}}
                                key={entry.id}
                                className="p-2 text-sm hover:bg-terciary-300">
                                {entry.name}
                            </li>))}
                    </ul>
                </>
                ) : null}
        </div>
        </>
    );
};

interface SelectProps {
    leadingOn?: JSX.Element;
    leadingOff?: JSX.Element;
    entries: { id: string, name: string }[];
    callback: (id :string)=>void;
}