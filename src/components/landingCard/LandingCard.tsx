import "./LandingCard.css";
import { LandingCardProps } from "../../typings/landing/LandingCardTypes";

export function LandingCard({img, caption}: LandingCardProps) {
    return (
        <div className="landing-card flex flex-col h-[40vh]:  w-[70vw] md:w-[20vw] overflow-hidden">
            <div className="card-image-div flex items-center justify-center flex-2 py-3">
                <img src={img} alt="" className="card-img"/>
            </div>
            <div className="caption font-quote text-xl flex items-center justify-center flex-1">
                <h1 className="px-6 text-center py-4">{caption}</h1>
            </div>
        </div>
    );
}