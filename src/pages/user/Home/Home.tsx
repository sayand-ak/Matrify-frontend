import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { userLogout } from "../../../redux/slices/userSlices";

export function Home(){
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    function handleLogout() {
        dispatch(userLogout());
        navigate("/user/login");
    }
    return (
        <>
            <Navbar page="home"/>

            <button onClick={handleLogout}>logout</button>
        </>
    )
}