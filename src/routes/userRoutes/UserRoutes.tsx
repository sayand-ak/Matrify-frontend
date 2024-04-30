import { Route, Routes } from 'react-router-dom';
import { Landing } from '../../pages/user/Landing/Landing';
import {  Login } from '../../pages/user/Login/Login';
import { SignUp } from '../../pages/user/SignUp/SignUp';
import { useEffect } from 'react';


export function UserRoutes (){

    useEffect(() => {
        document.title = "Matrify - User";
    })

    return(
        <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<SignUp/>}></Route>
        </Routes>
    )
}