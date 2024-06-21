
interface FilterSliderItemProps {
    item: string
}

export function FilterSliderItem({item}: FilterSliderItemProps) {
    return (
        <div 
            className="h-[50px] w-fit px-5 bg-[#F4F2EE] font-semibold rounded-lg flex items-center justify-center"
            style={{boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset"}}
        >
            <p>{item}</p>
        </div>
    )
}