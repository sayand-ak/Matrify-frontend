import { Route, Routes } from 'react-router-dom';
import { Landing } from '../../pages/user/Landing/Landing';
import {  Login } from '../../pages/user/Login/Login';
import { SignUp } from '../../pages/user/SignUp/SignUp';
import { useEffect } from 'react';
import { SetProfile } from '../../pages/user/SetProfile/SetProfile';
// import { FamilyDetails } from '../../pages/user/FamilyDetails/FamilyDetails';
// import { ProfessionDetails } from '../../pages/user/Profession/ProfessionDetails';
// import { SpiritualityDetails } from '../../pages/user/SpiritualityDetails/SpiritualityDetails';
// import { CollectDocs } from '../../pages/user/CollectDocs/CollectDocs';
import { UserPrivateRoute } from './UserPrivateRouter';
import { Home } from '../../pages/user/Home/Home';


export function UserRoutes (){

    useEffect(() => {
        document.title = "Matrify - User";
    })

    return(
        <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<SignUp/>} />
            <Route path='/*' element={<UserPrivateRoute/>} >
                <Route path='setProfile' element={<SetProfile/>} />
                <Route path='home' element={<Home/>} />

            </Route>
            {/* <Route path='*'> */}
            {/* <Route path='/setProfile' element={<SetProfile/>}></Route>
            <Route path='/familyDetails' element={<FamilyDetails/>}></Route>
            <Route path='/professionDetails' element={<ProfessionDetails/>}></Route>
            <Route path='/spiritualityDetails' element={<SpiritualityDetails/>}></Route>
            <Route path='/collectDocuments' element={<CollectDocs/>}></Route> */}
            {/* </Route> */}
        </Routes>
    )
}