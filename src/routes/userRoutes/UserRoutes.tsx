import { useEffect, Suspense, lazy, FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserPrivateRoute } from './UserPrivateRouter';

// Lazy load components
const Landing = lazy(() => import('../../pages/user/Landing/Landing'));
const Login = lazy(() => import('../../pages/user/Login/Login'));
const SignUp = lazy(() => import('../../pages/user/SignUp/SignUp'));
const SetProfile = lazy(() => import('../../pages/user/SetProfile/SetProfile'));
const Home = lazy(() => import('../../pages/user/Home/Home'));
const ProfessionDetails = lazy(() => import('../../pages/user/Profession/ProfessionDetails'));
const ResetPassword = lazy(() => import('../../pages/user/ResetPassword/resetPassword'));
const FamilyDetails = lazy(() => import('../../pages/user/FamilyDetails/FamilyDetails'));
const CollectDocs = lazy(() => import('../../pages/user/CollectDocs/CollectDocs'));
const SpiritualityDetails = lazy(() => import('../../pages/user/SpiritualityDetails/SpiritualityDetails'));
const Profile = lazy(() => import('../../pages/user/Profile/Profile'));
const Payment = lazy(() => import('../../pages/user/Payment/Payment'));
const PaymentSuccess = lazy(() => import('../../pages/user/PaymentSuccess/PaymentSuccess'));
const Chat = lazy(() => import('../../pages/user/Chat/Chat'));
const ReportUser = lazy(() => import('../../pages/user/ReportUser/ReportUser'));
const Room = lazy(() => import('../../pages/user/Room/Room'));
const ViewAllMatches = lazy(() => import('../../pages/user/ViewAllMatches.ts/ViewAllMatches'));

export const UserRoutes: FC = () => {
    useEffect(() => {
        document.title = "Matrify - User";
    }, []);


    return (
        <Suspense fallback={<div className='h-[100vh] w-[100vw] flex justify-center items-center text-[20px]'>
            <img src="../src/assets/svg/Ripple@1x-1.0s-200px-200px.svg" alt="" className='h-50 w-50' />
        </div>}>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path='/register' element={<SignUp />} />
                <Route path='/setProfile' element={<SetProfile />} />

                <Route path='/*' element={<UserPrivateRoute />} >
                    <Route path='home' element={<Home />} />
                    <Route path='setProfile' element={<SetProfile />} />
                    <Route path='setProfession' element={<ProfessionDetails />} />
                    <Route path='setFamilyDetails' element={<FamilyDetails />} />
                    <Route path='setReligiousDetails' element={<SpiritualityDetails />} />
                    <Route path='collectDocs' element={<CollectDocs />} />
                    <Route path='profile/:id' element={<Profile />} />
                    <Route path='chat' element={<Chat />} />
                    <Route path='payment' element={<Payment />} />
                    <Route path='paymentSuccess/:type' element={<PaymentSuccess />} />
                    <Route path='reportUser/:id' element={<ReportUser />} />
                    <Route path="room/:id" element={<Room />} />
                    <Route path='viewAllMatches/:matchBase/:matchKey/:matchData' element={<ViewAllMatches />} />
                </Route>

                <Route path='/resetPassword/:email/:token' element={<ResetPassword />} />
            </Routes>
        </Suspense>
    );
};
