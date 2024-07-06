import { Formik, Form, FormikHelpers } from 'formik';
import { InputField } from "../../../components/inputField/InputField";
import Navbar from "../../../components/navbar/Navbar";
import "./reportUser.css";
import { reportUserValidationSchema } from '../../../utils/validations/validateReportUser';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserProfile } from '../../../typings/Profile/professionDataType';
import { useAppDispatch } from '../../../hooks/useTypedSelectors';
import { reportUser, userProfile } from '../../../services/userAPI';
import { calculateAgeInYears } from '../../../utils/calculateAgeInYears';
import showToast from '../../../components/Toast/Toast';
import { ToastContainer } from 'react-toastify';

interface ReportUserFormValues {
    reason: string;
    narrative: string;
    screenshot: string;
    preferredAction: string;
}


function ReportUser () {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userData, setUserData] = useState<UserProfile>()
    const dispatch = useAppDispatch();
    const reportedUserId = useParams()
    const reportReasons = [
        "Inappropriate Content",
        "Harassment",
        "Scamming or Fraud",
        "Fake Profiles",
        "Spam",
        "Abusive Language",
        "Impersonation",
        "Privacy Violations",
        "Unsolicited Explicit Content",
        "Unwanted Contact",
        "Discrimination",
        "Violation of Terms of Service"
    ];
    
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await dispatch(userProfile(reportedUserId.id as string));
                setUserData(response.payload.data[0]);
            } catch (error) {
                navigate("/500");
            }
        }
        getUserData()
    }, [dispatch, reportedUserId])
    

    const handleSubmit = async (
        values: ReportUserFormValues,
        actions: FormikHelpers<ReportUserFormValues>
    ) => {
        try {            
            setIsSubmitting(true);
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                formData.append(key, values[key as keyof ReportUserFormValues]);
            });
            formData.append("reportedUserId", reportedUserId.id as string)

            // Send FormData to the API using fetch or axios
            const response = await dispatch(reportUser(formData));
            if (response.payload.success) {
                showToast("success",'Data submitted successfully, actions will be taken soon.', () => {
                    navigate("/home")
                });
                actions.resetForm();
            } else {
                showToast("error",'Failed to submit data');
            }
        } catch (error) {
            showToast("error",'Error submitting form data');
        } finally {
            setIsSubmitting(false);
        }
    };

    
    return (
        <div className="min-h-[100vh] w-[100vw] flex flex-col items-center justify-center">
            <Navbar page="reportUser"/>
            <div className="report-container min-h-[100vh] w-full md:w-[70%] flex flex-col md:flex-row font-gillroy">

                {/* profile image and username view */}
                <div className="w-full md:w-[40%] flex flex-col items-center justify-center gap-5 border-r-[1px]">
                    <div 
                        className="h-[200px] md:h-[350px] w-[50%] md:w-[90%] rounded-lg bg-blue-400"
                        style={{backgroundImage: `url(${userData?.image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}
                    >
                        
                    </div>
                    <h1 className="text-[25px] font-semibold text-center">{userData?.username}({calculateAgeInYears(userData?.dob as string)})</h1>
                </div>

                {/* report user form */}
                <div className="w-full md:w-[60%] flex flex-col items-center gap-4">
                    <h1 className="text-center text-3xl font-semibold border-b-[1px] py-7">Report user</h1>
                    
                    <Formik
                        initialValues={{ reason: '', narrative: '', screenshot: '', preferredAction: '' }}
                        validationSchema={reportUserValidationSchema}
                        onSubmit={handleSubmit} 
                    >
                        {({ values, errors, setFieldValue }) => (
                            <Form className="w-full flex flex-col items-center gap-4">
                                <InputField
                                    type="dropdown"
                                    label="Reason"
                                    options={reportReasons}
                                    name="reason"
                                    formik={{ values, errors, setFieldValue }} 
                                />
                                <InputField
                                    type="textarea"
                                    label="Narrative"
                                    name="narrative"
                                    formik={{ values, errors, setFieldValue }} 
                                />
                                <InputField
                                    type="file"
                                    label="Screenshot"
                                    name="screenshot"
                                    formik={{ values, errors, setFieldValue }} 
                                />
                                <InputField
                                    type="dropdown"
                                    label="Preferred action"
                                    options={['Block', 'Ban']}
                                    infoText={`Block: Prevents the user from contacting you. Ban: Removes the user from the platform.`}
                                    name="preferredAction"
                                    formik={{ values, errors, setFieldValue }} 
                                />

                                <button type="submit" className="outline-none border-[1px] h-10 rounded-lg px-5" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Report'}
                                </button>
                                </Form>
                        )}
                    </Formik>

                </div>
                <ToastContainer/>
            </div>
        </div>
    )
}

export default ReportUser;