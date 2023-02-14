import React, { useEffect, useRef, useState } from "react";
import Spinner from "../Spinner";

export default function SelectSector({ sectors, loading, onSelect }) {

    const [selected, setSelected] = useState([])
    const [sectorID, setSectorID] = useState("");
    const [parents, setParents] = useState([])
    const [parent, setParent] = useState(null)
    const filteredCategories = parent => sectors.filter(c => c.parent === parent)


    const getFilteredCategories = filteredCategories(parent)

    const ref = useRef();

    useEffect(() => {
        ref.current.scrollTo({
            left: ref.current.scrollLeft + 450,
            behavior: 'smooth'
        })
        onSelect(sectorID);
    }, [selected])

    if (loading) {
        return (
            <Spinner />
        )
    }

    return (
        <div className="flex gap-x-4 overflow-x-auto" ref={ref}>
            {parents.length > 0 && parents.map((parent, key) => {
                const categories = filteredCategories(parent)
                return (
                    <div key={key} className="w-[300px] h-[130px] overflow-y-auto flex flex-col border border-gray-300 rounded p-2 flex-shrink-0 bg-white">
                        {categories.map(c => (
                            <button
                                key={c._id}
                                type="button"
                                onClick={() => {
                                    setParent(c._id)
                                    setSelected([...selected.slice(0, key), c._id])
                                    setParents([...parents.slice(0, key), c.parent])
                                    setSectorID(c._id);
                                }}
                                className={`p-2 rounded text-left text-sm ${selected.includes(c._id) ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}>
                                {c.sectorName}
                            </button>
                        ))}
                    </div>
                )
            })}
            {getFilteredCategories.length > 0 && (
                <div className="w-[300px] h-[130px] overflow-y-auto flex flex-col border border-gray-300 rounded p-2 flex-shrink-0 bg-white">
                    {getFilteredCategories.map(c => (
                        <button
                            key={c._id}
                            type="button"
                            onClick={() => {
                                setParent(c._id)
                                setSelected([...selected, c._id])
                                setParents([...parents, c.parent])
                                setSectorID(c._id);
                            }}
                            className=" p-2 rounded text-left hover:bg-gray-100 text-sm">
                            {c.sectorName}
                        </button>
                    ))}
                </div>
            ) || (
                    <div className="font-semibold text-green-600 text-sm flex-shrink-0">
                        <div className="border  py-2 px-3 rounded-full bg-white">
                            ✔
                        </div>
                    </div>
                )}
        </div>
    )

}