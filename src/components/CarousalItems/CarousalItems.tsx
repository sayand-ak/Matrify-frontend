

export function CarousalItems() {
    return(
        <div 
            className="relative h-[280px] w-[250px] bg-blue-500 rounded-lg overflow-hidden"
            style={{backgroundImage: "url(../src/assets/images/businesswoman-posing.jpg)", backgroundSize: "cover", backgroundPosition:"center"}}
        >
            <div className="absolute bottom-0 text-white  w-full h-16 font-gillroy bg-gradient-to-b from-[#00000055] to-[#000000] pl-5">
                <div className="flex gap-1 items-center font-bold text-[20px]">
                    <h1>Marry Paul</h1>,
                    <span>23</span>
                </div>
                Kerala, Kochi
            </div>
        </div>
    )
}