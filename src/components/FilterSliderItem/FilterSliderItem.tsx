import "./filterSliderItem.css";
interface FilterSliderItemProps {
    item: string;
    handleFilterItemClick: (item: string) => void;
    selectedFilterItem: string | null;
}

export function FilterSliderItem({item, handleFilterItemClick, selectedFilterItem}: FilterSliderItemProps) {
    return (
        <button
        key={item}
        className={`filter-button ${selectedFilterItem === item ? 'active' : ''}`} 
        onClick={() => handleFilterItemClick(item)}
    >
        {item}
    </button>
    )
}