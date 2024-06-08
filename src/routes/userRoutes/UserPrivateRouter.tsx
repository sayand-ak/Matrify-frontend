import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";

export function UserPrivateRoute(){
    const { user } = useSelector((state:RootState) => state.user);
    return user ?<Outlet/> :  <Navigate to="/login" replace />
}

