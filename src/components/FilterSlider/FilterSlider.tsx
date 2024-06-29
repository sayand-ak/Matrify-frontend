import { useCallback, useEffect, useState } from "react";
import { FilterSliderItem } from "../FilterSliderItem/FilterSliderItem";
import { getPossibleFilterValues } from "../../services/userAPI";
import { useAppDispatch } from "../../hooks/useTypedSelectors";

interface FilterSliderProps {
    matchKey: string;
    handleFilterItemClick: (item: string) => void;
    selectedFilterItem: string | null
}

export function FilterSlider ({ matchKey, handleFilterItemClick, selectedFilterItem  }: FilterSliderProps) {
    const [initialFilterItems, setInitialFilterItems] = useState<string[]>([]);
    const [filterSliderItems, setFilterSliderItems] = useState<string[]>([]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (selectedFilterItem) {
            setFilterSliderItems((prevItems) => {
                const filteredItems = prevItems.filter(item => item !== selectedFilterItem);
                return [selectedFilterItem, ...filteredItems];
            });
        } else {
            setFilterSliderItems(initialFilterItems);
        }
    }, [selectedFilterItem]);

    
    const handleGetFilterSliderItems = useCallback(async() => {
        const response = await dispatch(getPossibleFilterValues(matchKey));        
        setFilterSliderItems(response.payload.data[0].values);
        setInitialFilterItems(response.payload.data[0].values);
    }, [dispatch, matchKey]);

    useEffect(() => {
        handleGetFilterSliderItems();
    }, [handleGetFilterSliderItems]);

    return (
        <div className="flex gap-20 px-24 justify-around items-center min-h-32 w-fit bg-[#fff]">
            {filterSliderItems.map((item, index) => (
                <FilterSliderItem key={index} item={item} handleFilterItemClick={handleFilterItemClick} selectedFilterItem={selectedFilterItem}/>
            ))}
        </div>
    )
}