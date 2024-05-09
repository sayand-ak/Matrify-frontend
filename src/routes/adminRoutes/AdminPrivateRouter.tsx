import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";

export function AdminPrivateRoute(){
    const { admin } = useSelector((state:RootState) => state.admin);
    return admin ?<Outlet/> :  <Navigate to="/admin/login" replace />
}

