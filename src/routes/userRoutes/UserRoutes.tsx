import { Route, Routes } from 'react-router-dom';
import { Landing } from '../../pages/user/Landing/Landing';
import {  Login } from '../../pages/user/Login/Login';


export function UserRoutes (){
    return(
        <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path='/login' element={<Login/>} />
        </Routes>
    )
}