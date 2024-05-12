import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import { resetPasswordSchema } from '../../../utils/validations/validateResetPassword';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useTypedSelectors';
import { resetPassword, validateToken } from '../../../services/userAPI';
import { Loader } from '../../../components/loader/Loader';
import showToast from '../../../components/Toast/Toast';
import { ToastContainer } from 'react-toastify';

export function ResetPassword() {
    const [userId, setUserId] = useState<string>('');
    const dispatch = useAppDispatch();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTokenValidation = async () => {
            if (params.token) {
                const response = await dispatch(validateToken(params.token));
                if (response.payload.success) {
                    setUserId(response.payload.user)
                } 
            }
        };

        fetchTokenValidation();
    }, [dispatch, params.token]);

        
    async function handleResetPassword(userId: string, newPassword: string) {
        const response = await dispatch(resetPassword({userId: userId, newPassword: newPassword}));
        if(response.payload.success){
            showToast('success', 'Password reset successful!', () => {
                navigate('/user/login');
            });
            
        }else{
            showToast('error', 'Password reset failed!');
        }

    }
    

    return (
        <div className="h-[100vh] flex items-center justify-center">
        {userId ?
            <div className="login-card-container flex flex-col-reverse w-full h-full md:flex-row md:w-[65vw] md:max-h-[550px] md:rounded-[50px] overflow-hidden">
                <div className="form-container flex-1 flex justify-center bg-[#f4f4f4] rounded-t-[50px] md:rounded-none">
                <Formik
                    initialValues={{ newPassword: '', confirmPassword: '' }}
                    validationSchema={resetPasswordSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        handleResetPassword(userId, values.newPassword);
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ isSubmitting }) => (
                    <Form className="flex flex-col w-[80%] items-center md:items-start mt-12 md:mt-20">
                        <h1 className="heading font-semibold text-3xl font-gillroy">Matrify Reset Password</h1>
                        <p className="text-sm py-5">Enter your new password below to regain access to your account.</p>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="newPassword" className="text-sm font-semibold">New Password</label>
                            <Field type="password" name="newPassword" className="w-full h-14 rounded-lg px-5 outline-none" />
                            <span className='h-5'>
                                <ErrorMessage name="newPassword" component="div" className="error text-red-600 text-sm"/>
                            </span>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="confirmPassword" className="text-sm font-semibold">Confirm Password</label>
                            <Field type="password" name="confirmPassword" className="w-full h-14 rounded-lg px-5 outline-none" />
                            <span className='h-5'>
                                <ErrorMessage name="confirmPassword" component="div" className="error text-red-600 text-sm" />
                            </span>
                        </div>
                        <div className="py-2 flex items-center justify-center w-full">
                        <button type="submit" className="w-[200px] px-5 py-2 rounded-md bg-[#1b2931] text-white font-semibold" disabled={isSubmitting}>
                            {isSubmitting ? <Loader/> : 'Reset'}
                        </button>
                        </div>
                    </Form>
                    )}
                </Formik>
                </div>

                <div
                className="image-container h-[250px] md:h-full md:flex-1 flex justify-center items-center"
                style={{ backgroundImage: `url(${"/src/assets/images/security-amico.png"})`, backgroundSize: "contain"}}
                ></div>
                <ToastContainer/>

            </div>
            :
            <div>
                <img src="/src/assets/images/404.png" alt="" height={"500px"} width={"500px"} />
                <p className='text-2xl font-semibold text-center text-[#BA68C8]'>Sorry! Link was expired</p>
            </div>
        }
        </div>
    );
}
