import { Route, Routes } from 'react-router-dom';
import { Login } from '../../pages/admin/Login/Login';
import { useEffect } from 'react';
import { Home } from '../../pages/admin/Home/Home';
import { AdminPrivateRoute } from './AdminPrivateRouter';


export function AdminRoutes (){

    useEffect(() => {
        document.title = "Matrify - Admin";
    })

    return(
        <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='*' element={<AdminPrivateRoute/>}>
                <Route path='*' element={<Home/>} />
            </Route>
        </Routes>
    )
}