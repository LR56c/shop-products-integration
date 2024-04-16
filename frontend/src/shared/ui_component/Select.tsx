import {FC, JSX, useState} from "react";

export const Select:FC<SelectProps> = ({leading}) => {
    const [showList, setShowList] = useState(false)

    const toggleList = () => {
        setShowList(!showList)
    }

    return (
        <>
        <div className="w-60 h-24 space-y-2 font-semibold">
                <div className="flex justify-between items-center bg-black text-white p-2 rounded-md"
                onClick={toggleList}>
                    selector
                    {leading}
                </div>
                {showList ? (
                    <ul className="bg-black text-white">
                        <li className="p-2 text-sm hover:bg-terciary-300">

                        </li>
                    </ul>
                ) : null}
        </div>
        </>
    );
};

interface SelectProps {
    leading?: JSX.Element;
    entries: { id: string, name: string };
}