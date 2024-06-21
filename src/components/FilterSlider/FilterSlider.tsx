import { useCallback, useEffect, useState } from "react";
import { FilterSliderItem } from "../FilterSliderItem/FilterSliderItem";
import { getPossibleFilterValues } from "../../services/userAPI";
import { useAppDispatch } from "../../hooks/useTypedSelectors";

interface FilterSliderProps {
    matchKey: string;
}

export function FilterSlider ({ matchKey }: FilterSliderProps) {

    const [filterSliderItems, setFilterSliderItems] = useState<string[]>([]);

    const dispatch = useAppDispatch();
    
    const handleGetFilterSliderItems = useCallback(async() => {
        const response = await dispatch(getPossibleFilterValues(matchKey));
        console.log(response.payload.data[0].values, "{{{{{{{{{{{}}}}}}}}}}}");
        
        setFilterSliderItems(response.payload.data[0].values);
    }, [dispatch, matchKey]);

    useEffect(() => {
        handleGetFilterSliderItems();
    }, [handleGetFilterSliderItems]);

    return (
        <div className="flex gap-20 px-16 justify-around items-center min-h-32 w-fit bg-[#fff]">
            {filterSliderItems.map((item, index) => (
                <FilterSliderItem key={index} item={item} />
            ))}
        </div>
    )
}