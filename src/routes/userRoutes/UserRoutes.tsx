import { Navigate, Route, Routes } from 'react-router-dom';
import { Landing } from '../../pages/user/Landing/Landing';
import {  Login } from '../../pages/user/Login/Login';
import { SignUp } from '../../pages/user/SignUp/SignUp';
import { useEffect } from 'react';
import { SetProfile } from '../../pages/user/SetProfile/SetProfile';

import { UserPrivateRoute } from './UserPrivateRouter';
import { Home } from '../../pages/user/Home/Home';
import { ProfessionDetails } from '../../pages/user/Profession/ProfessionDetails';
import { ResetPassword } from '../../pages/user/ResetPassword/resetPassword';
import { FamilyDetails } from '../../pages/user/FamilyDetails/FamilyDetails';
import { CollectDocs } from '../../pages/user/CollectDocs/CollectDocs';
import { SpiritualityDetails } from '../../pages/user/SpiritualityDetails/SpiritualityDetails';
import { Profile } from '../../pages/user/Profile/Profile';
import { Payment } from '../../pages/user/Payment/Payment';
import { PaymentSuccess } from '../../pages/user/PaymentSuccess/PaymentSuccess';
import { Chat } from '../../pages/user/Chat/Chat';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/app/store';
import { ReportUser } from '../../pages/user/ReportUser/ReportUser';
import { Room } from '../../pages/user/Room/Room';


export function UserRoutes (){
    const { user } = useSelector((state:RootState) => state.user);
    useEffect(() => {
        document.title = "Matrify - User";
    });

    return(
        <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
            <Route path='/register' element={<SignUp/>} />
            <Route path='/setProfile' element={<SetProfile/>} />

            <Route path='/*' element={<UserPrivateRoute/>} >

                <Route path='home' element={<Home/>} />
                <Route path='setProfile' element={<SetProfile/>} />
                <Route path='setProfession' element={<ProfessionDetails/>} />
                <Route path='setFamilyDetails' element={<FamilyDetails/>} />
                <Route path='setReligiousDetails' element={<SpiritualityDetails/>} />
                <Route path='collectDocs' element={<CollectDocs/>} />
                <Route path='profile/:id' element={<Profile/>} />
                <Route path='chat' element={<Chat/>}/>
                <Route path='payment' element={<Payment/>} />
                <Route path='paymentSuccess/:type' element={<PaymentSuccess/>} />
                <Route path='reportUser/:id' element={<ReportUser/>} />
                <Route path="room/:id" element={<Room />} />

            </Route>

            <Route path='/resetPassword/:email/:token' element={<ResetPassword/>} />

        </Routes>
    )
}