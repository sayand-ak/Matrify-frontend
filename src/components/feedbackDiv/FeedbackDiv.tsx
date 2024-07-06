import { useState, useEffect } from "react";
import { CustomModal } from "../modal/CustomModal";
import { InterestReceived, InterestSend } from "../../typings/user/userTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelectors";
import { userProfile } from "../../services/userAPI";
import { handleImageChange } from "../../utils/handleImageChange";
import { useFormik } from "formik";
import { validateFeedback } from "../../utils/validations/validateFeedback";
import { addFeedback } from "../../services/feedbackAPI";
import { Loader } from "../loader/Loader";
import showToast from "../Toast/Toast";
import { FeedbackResponse } from "../../typings/feedback/feedback";
import { useNavigate } from "react-router-dom";

interface FeedbackDivProps {
    matchSend: InterestSend[] | undefined;
    matchReceived: InterestReceived[] | undefined;
    userFeedback: FeedbackResponse | null
}

export function FeedbackDiv({ matchSend, matchReceived, userFeedback }: FeedbackDivProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [userOptions, setUserOptions] = useState<{ id: string; username: string; image: string; }[]>([]);
    const [selectedUser, setSelectedUser] = useState<{ id: string; username: string; image: string } | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const curUserId = useAppSelector((state) => state.user.user?._id);
    const navigate = useNavigate();


    useEffect(() => {
        const interestUserIds = new Set<string>();
        matchSend?.forEach((item) => interestUserIds.add(item.sendTo));
        matchReceived?.forEach((item) => interestUserIds.add(item.sendBy));

        const fetchUsers = async () => {
            try {
                const userIds = Array.from(interestUserIds);
                const users = await Promise.all(userIds.map(async (id) => {
                    const response = await dispatch(userProfile(id));
                    return response.payload.data[0];
                }));
                const options = users.map((user: any) => ({
                    id: user._id,
                    username: user.username,
                    image: user.image,
                }));
                setUserOptions(options);
                
            } catch (error) {
                navigate("/500");
            }
        };

        fetchUsers();
    }, [matchSend, matchReceived, dispatch]);

    useEffect(() => {
        if (selectedUser) {
            formik.setFieldValue('partner', selectedUser.id);
        }
    }, [selectedUser]);

    const handleOptionClick = (user: { id: string; username: string; image: string }) => {
        setSelectedUser(user);
        setIsDropdownOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            partner: "" ,
            story: "",
            image: imageFile,
        },
        validationSchema: validateFeedback,
        onSubmit: async(values) => {
            try {
                const formData = new FormData();
                formData.append("userId", curUserId || "")
                formData.append('partnerId', values.partner);
                formData.append('story', values.story);
                if (values.image) {
                    formData.append('file', values.image);
                }
    
                setLoading(true);
                const response = await dispatch(addFeedback(formData));
    
                if(response.payload.success) {
                    showToast("success", "Feedback added successfully!");
                    setIsModalOpen(false);
                    formik.resetForm();
                    setSelectedUser(null);
                    setImageUrl(null);
                    setImageFile(null);
                } else {
                    showToast("error", "Failed to add feedback. Please try again later.");
                }
                setLoading(false);
                
            } catch (error) {
                navigate("/500");
            }
        },
    });
    return (
        userFeedback ? (
        <div className="progress-card mx-auto bg-[#fbfbfb] flex flex-col justify-center items-center gap-4 rounded-lg w-[90%] md:w-[260px] p-4 text-center shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">Your Success Story</h2>
            <div className="mt-4">
                <p className="mt-2 text-sm text-gray-600">{userFeedback.story}</p>
                {userFeedback.image && (
                    <img src={userFeedback.image} alt="Success Story" className="mt-4 rounded-lg w-full h-auto"/>
                )}
            </div>
        </div>
    ) : (
        
        <div className="progress-card h-[12rem] md:h-[15rem] bg-[#fbfbfb] flex flex-col justify-center items-center gap-4 rounded-lg w-[260px] p-4 text-center shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">Share Your Success Story</h2>
            <p className="text-sm text-gray-600">
                We would love to hear about your journey. Share your success story to inspire others!
            </p>
            <button 
                className="mt-4 px-4 py-2 bg-[#cfb281] text-white rounded-lg hover:bg-[#bca275]"
                onClick={() => setIsModalOpen(true)}
            >
                Add Success Story
            </button>

            <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <div className="min-h-[80vh] min-w-[50vw] flex flex-col items-center p-10">
                    <h1 className="text-[30px] font-bold">User Feedback</h1>
                    <form className="w-[90%]" onSubmit={formik.handleSubmit}>

                        <div className="flex flex-col">
                            <label htmlFor="partner" className="text-sm pb-1">Who is your partner?</label>
                            <div className="relative w-full">
                                <div 
                                    className="bg-gray-200 p-2 rounded-lg cursor-pointer flex items-center justify-between" 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    {selectedUser ? (
                                        <div className="flex items-center">
                                            <img src={selectedUser.image} alt="" className="h-10 w-10 rounded-full mr-2"/>
                                            {selectedUser.username}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            Select partner
                                        </p>
                                    )}
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                                {isDropdownOpen && (
                                    <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-60 overflow-y-auto w-full z-10">
                                        {userOptions.map((user, index) => (
                                            <div 
                                                key={index} 
                                                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => handleOptionClick(user)}
                                            >
                                                <img src={user.image} alt="" className="h-10 w-10 rounded-full mr-2"/>
                                                <span>{user.username}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {formik.touched.partner && formik.errors.partner ? (
                                    <div className="text-red-500 text-sm">{formik.errors.partner}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="flex flex-col mt-4">
                            <label htmlFor="story" className="text-sm pb-1">Story</label>
                            <textarea 
                                id="story" 
                                className="bg-gray-200 outline-none p-2 rounded-lg placeholder:text-sm resize-none" 
                                rows={3} 
                                placeholder="Tell your experience" 
                                {...formik.getFieldProps('story')}
                            >
                            </textarea>
                            
                            {formik.touched.story && formik.errors.story ? (
                                <div className="text-red-500 text-sm">{formik.errors.story}</div>
                            ) : null}
                        </div>
                        
                        <div className="flex flex-col mt-4">
                            <label htmlFor="image-upload" className="text-sm">Add a moment</label>
                            <div className="image-container px-5 md:h-full md:flex-1 flex flex-col justify-center bg-gray-200 rounded-md">
                                <div
                                    className="relative rounded-xl w-[250px] h-[250px] md:w-full md:h-[300px]"
                                    style={{
                                        backgroundImage: `url(${imageUrl ? imageUrl : "/images/image_label.png"})`,
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center"
                                    }}
                                >
                                    <input
                                        type="file"
                                        id="image-upload"
                                        className="w-full h-full opacity-0"
                                        onChange={(e) => {
                                            handleImageChange(e, setImageUrl, setImageFile);
                                            if(e.target.files){
                                                formik.setFieldValue('image', e.target.files[0]);
                                            }
                                        }}
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {formik.touched.image && formik.errors.image ? (
                                <div className="text-red-500 text-sm">{formik.errors.image}</div>
                            ) : null}

                        </div>

                        <button 
                            type="submit" 
                            className="mt-4 w-20 flex justify-center px-4 py-2 bg-[#1b2931] text-white rounded-lg hover:bg-[#bca275] shadow-lg"
                        >
                            {loading? <Loader dimension={30}/> : "Submit"}
                        </button>

                    </form>
                </div>
            </CustomModal>
        </div>
    ));
}

export default FeedbackDiv;
