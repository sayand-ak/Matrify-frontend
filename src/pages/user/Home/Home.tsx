// import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
// import { useAppDispatch } from "../../../hooks/useTypedSelectors";
// import { userLogout } from "../../../redux/slices/userSlices";
import { Banner } from "../../../components/Banner/Banner";
import { Carousal } from "../../../components/Carousal/Carousal";
import { Footer } from "../../../components/footer/Footer";
import "./Home.css";
import { QuoteBanner } from "../../../components/Banner/QuoteBanner";

export function Home(){
    // const dispatch = useAppDispatch();
    // const navigate = useNavigate()
    // function handleLogout() {
    //     dispatch(userLogout());
    //     navigate("/user/login");
    // }
    return ( 
        <div className="home-container">
            <Navbar page="home"/>
            
            <div className="h-[89vh]">
                <Banner/>
            </div>

            <Carousal/>
            <Carousal/>

            <QuoteBanner/>
            
            <Carousal/>
            <Carousal/>

            <Footer/>

            {/* <button onClick={handleLogout}>logout</button> */}
        </div>
    )
}