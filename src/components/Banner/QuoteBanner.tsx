import "./Banner.css";

export function QuoteBanner () {
    return (
        <div className="min-h-[70vh] flex bg-[#F5F2EC]">

            <div 
                className="quote-image w-1/2 rounded-r-[60px] bg-red-100"
                // style={{backgroundImage: "url(../src/assets/images/banner2.jpg)", backgroundSize: "cover", backgroundPosition: "center"}}
            >

            </div>

            <div className="banner-quote w-1/2 flex flex-col items-center justify-center text-[46px] font-gillroy">
                <h1>Let here smile be your wealth</h1>
                <h1 className="text-[#c99948]">SAY NO TO DOWRY</h1>
            </div>

        </div>
    )
}