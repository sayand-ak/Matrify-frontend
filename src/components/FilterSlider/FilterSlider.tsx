import { useCallback, useEffect, useState } from "react";
import { FilterSliderItem } from "../FilterSliderItem/FilterSliderItem";
import { getPossibleFilterValues } from "../../services/userAPI";
import { useAppDispatch } from "../../hooks/useTypedSelectors";
import { useNavigate } from "react-router-dom";
import { AggregateFilterResult } from "../../typings/user/userTypes";

interface FilterSliderProps {
    matchKey: string;
    handleFilterItemClick: (item: string) => void;
    selectedFilterItem: string | null;
}

export function FilterSlider({ matchKey, handleFilterItemClick, selectedFilterItem }: FilterSliderProps) {
    const [initialFilterItems, setInitialFilterItems] = useState<string[]>([]);
    const [filterSliderItems, setFilterSliderItems] = useState<string[] | AggregateFilterResult>([]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (matchKey !== "random" && selectedFilterItem) {
            setFilterSliderItems((prevItems) => {
                if (Array.isArray(prevItems)) {
                    const filteredItems = prevItems.filter(item => item !== selectedFilterItem);
                    return [selectedFilterItem, ...filteredItems];
                }
                return prevItems;
            });
        } else if (matchKey !== "random") {
            setFilterSliderItems(initialFilterItems);
        }
    }, [selectedFilterItem, matchKey, initialFilterItems]);

    const handleGetFilterSliderItems = useCallback(async () => {
        try {
            const response = await dispatch(getPossibleFilterValues(matchKey));
            if (matchKey === "random") {
                console.log(response.payload.data , "data");
                setFilterSliderItems(response.payload.data);
                
            } else {
                setFilterSliderItems(response.payload.data[0].values);
                setInitialFilterItems(response.payload.data[0].values);
            }
        } catch (error) {
            navigate("/500");
        }
    }, [dispatch, matchKey, navigate]);

    useEffect(() => {
        handleGetFilterSliderItems();
    }, [handleGetFilterSliderItems]);

    if (matchKey === "random") {
        return (
            <div className="flex overflow-x-auto gap-20 px-24 rounded-lg shadow justify-around items-center min-h-32 w-fit bg-[#fff] overflow-y-hidden z-50">
                {Object.entries(filterSliderItems).map(([key, values]) => {
                    if (!Array.isArray(values) || values.length === 0) return null;
                    
                    return (
                        <div key={key} className="flex-shrink-0 filter-button relative">
                            <details className="dropdown">
                                <summary className="m-1 btn">{key}</summary>
                                <ul className="p-2 menu dropdown-content bg-base-100 absolute left-0 w-full bg-[#fff] shadow flex flex-col gap-3 z-[500] max-h-[50px] overflow-y-scroll">
                                    {values.map((value, index) => (
                                        <li key={index}>
                                            <label className="flex items-center space-x-2">
                                                <input 
                                                    type="checkbox"
                                                    className="checkbox"
                                                    onChange={() => handleFilterItemClick(`${value}`)}
                                                    checked={selectedFilterItem === `${value}`}
                                                />
                                                <span className="text-black text-sm">{value.toString()}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        </div>
                    );
                })}
            </div>
        )
    }

    return (
        <div className="flex gap-20 px-24 justify-around items-center min-h-32 w-fit bg-[#fff]">
            {Array.isArray(filterSliderItems) && filterSliderItems.map((item, index) => (
                <FilterSliderItem 
                    key={index} 
                    item={item} 
                    handleFilterItemClick={handleFilterItemClick} 
                    selectedFilterItem={selectedFilterItem}
                />
            ))}
        </div>
    );
}