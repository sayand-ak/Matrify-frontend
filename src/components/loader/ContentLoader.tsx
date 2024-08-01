import "./loader.css"

export function ContentLoader() {
    return (
        <div 
        className="relative h-[280px] w-[250px] bg-[#f1f1f08d]  rounded-lg overflow-hidden"
        >
            <div className="absolute bottom-0 h-20 font-gillroy w-3/4 flex flex-col gap-2 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 pl-4">
                <div className="loader-text-div flex gap-1 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm opacity-15 w-[220px] h-[30px] rounded-lg "></div>
                <div className="loader-text-div flex gap-1 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm opacity-15 w-[140px] h-[20px] rounded-lg "></div>
            </div>
        </div>
    )
}