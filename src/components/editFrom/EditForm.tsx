import { useEffect, useState } from "react";
import { CustomModal } from "../modal/CustomModal";
import { useFormik } from "formik";
import { ProfileEditFormData } from "../../typings/Profile/profileTypes";
import { editProfile, getCitiesApi, getStateApiAccessToken } from "../../services/userAPI";
import { editProfileSchema } from "../../utils/validations/validateProfileData";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelectors";
import { handleImageChange } from "../../utils/handleImageChange";
import { MdEdit } from "react-icons/md";
import { states } from "indian_address";
import { UserFamily, UserProfession, UserProfile } from "../../typings/Profile/professionDataType";


interface EditModalProp {
    userData?: {
        profile?: UserProfile;
        family?: UserFamily;
        profession?: UserProfession;
    };
    isModalOpen: boolean;
    setIsModalOpen: (val: boolean) => void;
}

export function EditFormModal({userData: userData, isModalOpen: isModalOpen, setIsModalOpen: setIsModalOpen}: EditModalProp) {

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [selectedState, setSelectedState] = useState<string>();  
    const [cities, setCities] = useState<string[]>([]);

    const [editStats, setEditStats] = useState<string>("");
    const [editMsg, setEditMsg] = useState<string>("");

    const [isVisible, setIsVisible] = useState(true);



    const selector = useAppSelector((state) => state.user.user);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            if (selectedState) {
                try {
                    const token = await getStateApiAccessToken();
                    
                    if (token) {
                        const cities = await getCitiesApi(token.auth_token, selectedState);
                        setCities(cities.map((city:{city_name:string}) => city.city_name));
                    }
                } catch (error) {
                    console.error("Error fetching cities data:", error);
                }
            }
        };
    
        fetchData();
    }, [selectedState]);

    useEffect(() => {
        if (userData?.profile?.state) {
            setSelectedState(userData.profile.state);
        }

        const timer = setTimeout(() => {
            setIsVisible(false);
          }, 10000); 
      
          // Cleanup the timer on component unmount
          return () => clearTimeout(timer);

    }, [userData]);
    

    const formik = useFormik<ProfileEditFormData>({
        enableReinitialize: true,
        initialValues: {
            username: userData?.profile?.username || '',
            dob: userData?.profile?.dob || '',
            gender: userData?.profile?.gender || '',
            state: userData?.profile?.state || '',
            district: userData?.profile?.district || '',
            motherTongue: userData?.profile?.motherTongue || '',
            height: userData?.profile?.height || 0,
          },

        validationSchema: editProfileSchema,
        onSubmit: async(values) => {              
            //create form data
            const formData = new FormData();

            //appending data to form data
            for (const [key, value] of Object.entries(values)) {
                formData.append(key, value);
            }
            if(selector){
                formData.append("id", selector?._id);
            }

            //checking if image is uploaded 
            if (imageFile) {
                formData.append("edit_image", imageFile); 
            }
            
           const response = await dispatch(editProfile(formData));
        
           if(response.payload.success){
                setEditStats("success");
                setEditMsg(response.payload.message);
           }else{
                setEditStats("error");
                setEditMsg(response.payload.message);
           }
           
        },
    });


    return(
        <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
            <div className="py-10 md:py-5 md:w-[60rem] h-[40rem] md:h-1/2 flex flex-col items-center justify-center overflow-scroll md:overflow-hidden">
            <h1 className="text-[25px] font-semibold py-5 mt-[25rem] md:mt-0">EDIT PROFILE</h1>
            <div className="flex flex-col md:flex-row md:gap-10 items-center justify-center w-full px-10 border-l-[1px]">
                <div
                    className="relative rounded-full w-[230px] h-[230px] md:w-[400px] md:h-[360px] border-[1px] border-[#c4c1c1]"
                        style={{
                        backgroundImage: `url(${
                            imageUrl ? imageUrl : userData?.profile?.image
                        })`,
                        backgroundSize: "cover",
                        }}
                >
                    <input
                        type="file"
                        className="w-full h-full opacity-0"
                        onChange={(e) => handleImageChange(e, setImageUrl, setImageFile)}
                    />
                    <MdEdit 
                        className="bg-gray-600 text-white rounded-full px-3 py-3 h-[50px] w-[50px] absolute bottom-3 right-4 md:bottom-5 md:right-10 flex"
                    />
                </div>

                <form 
                    className="flex flex-col md:gap-6 pt-10"
                    onSubmit={formik.handleSubmit}
                >

                    <div className="w-full input-container flex flex-col" id="username-div">
                        <label 
                            htmlFor="username" 
                            className="text-sm font-semibold"
                        >
                            Username
                        </label>
                        <input 
                            type="text" 
                            id="username" 
                            className="px-4 py-3 outline-none w-full rounded-md"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {<span className="text-red-500 text-xs">{formik.errors.username}</span>}
                    </div>

                        <div className="flex gap-4 items-center flex-col md:flex-row">
                            <div className="w-full flex flex-col">
                                <label
                                    htmlFor="dob"
                                    className="text-sm font-semibold"
                                >
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    className="py-4 px-4 outline-none w-full rounded-md"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.dob}
                                />
                                {(
                                    <div className="error text-[12px] text-red-600">
                                    {formik.errors.dob}
                                    </div>
                                )}
                            </div>

                            <div className="w-full flex flex-col">
                                <label
                                    htmlFor="gender"
                                    className="text-sm font-semibold"
                                >
                                    Gender
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    className="py-4 px-4 outline-none w-full rounded-md"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.gender}
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                {(
                                    <div className="error text-[12px] text-red-600">
                                    {formik.errors.gender}
                                    </div>
                                )}
                            </div>

                        </div>

                        <div className="flex gap-3 w-full flex-col md:flex-row">
                            <div className="w-full flex flex-col">
                                <label
                                    htmlFor="state"
                                    className="text-sm font-semibold"
                                >
                                    State
                                </label>
                                <select
                                    id="state"
                                    name="state"
                                    className="py-4 px-4 outline-none w-full rounded-md"
                                    onChange={(e) => {
                                        formik.handleChange(e)
                                        setSelectedState(e.target.value);
                                    }}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.state}
                                >
                                    <option value="">Select state</option>
                                    {
                                        states.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="w-full flex flex-col">
                                <label
                                    htmlFor="district"
                                    className="text-sm font-semibold"
                                >
                                    District
                                </label>
                                <select
                                    id="district"
                                    name="district"
                                    className="py-4 px-4 outline-none w-full rounded-md"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.district}
                                >
                                    <option value="">Select state</option>
                                    {
                                        cities.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))
                                    }
                                </select>
                                {(
                                    <div className="error text-[12px] text-red-600">
                                    {formik.errors.district}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4 flex-col md:flex-row">
                                <div className="w-full flex flex-col">
                                    <label
                                            htmlFor="motherTongue"
                                            className="text-sm font-semibold pb-2"
                                    >
                                        Mother Tongue
                                    </label>
                                    <select
                                        id="motherTongue"
                                        name="motherTongue"
                                        className="py-4 px-4 outline-none w-full rounded-md"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.motherTongue}
                                    >
                                        <option value="">Select one</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="English">English</option>
                                        <option value="Bengali">Bengali</option>
                                        <option value="Telugu">Telugu</option>
                                        <option value="Marathi">Marathi</option>
                                        <option value="Tamil">Tamil</option>
                                        <option value="Urdu">Urdu</option>
                                        <option value="Gujarati">Gujarati</option>
                                        <option value="Kannada">Kannada</option>
                                        <option value="Odia">Odia</option>
                                        <option value="Punjabi">Punjabi</option>
                                        <option value="Malayalam">Malayalam</option>
                                        <option value="Assamese">Assamese</option>
                                        <option value="Maithili">Maithili</option>
                                        <option value="Santali">Santali</option>
                                        <option value="Kashmiri">Kashmiri</option>
                                        <option value="Nepali">Nepali</option>
                                        <option value="Konkani">Konkani</option>
                                        <option value="Sindhi">Sindhi</option>
                                        
                                    </select>
                                    {(
                                        <div className="error text-[12px] text-red-600 h-2">
                                            {formik.errors.motherTongue}
                                        </div>
                                    )}
                            </div>

                            <div className="w-full flex flex-col">
                                <label
                                    htmlFor="height"
                                    className="text-sm font-semibold pb-2"
                                >
                                    Height(cm)
                                </label>
                                <input
                                    type="number"
                                    id="height"
                                    name="height"
                                    className="py-4 px-4 outline-none w-full rounded-md"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.height}
                                />
                                {(
                                    <div className="error text-[12px] text-red-600 h-2">
                                    {formik.errors.height}
                                    </div>
                                )}
                            </div>
                        </div>

                    <div className="flex flex-col items-center">
                        <button
                            type="submit"
                            className="px-5 py-2 mt-5 md:my-10 rounded-md bg-[#1B2931] text-white font-semibold w-[200px] flex items-center justify-center"
                        >
                            Edit
                        </button>
                    </div>
                </form>
            </div> 
            </div>

            {
                editStats == "success" && isVisible && 
                <div className="showEditStatus h-[3.5rem] bg-green-400 flex items-center px-10 text-white" >
                    <p className="font-semibold">{editStats.toUpperCase()} : </p><p>{editMsg}</p>
                </div>
            }
            {
                editStats == "error" && isVisible &&
                <div className="showEditStatus h-[3.5rem] bg-red-400 flex items-center px-10 text-white" >
                    <p className="font-semibold">{editStats.toUpperCase()} : </p><p>{editMsg}</p>
                </div>

            }
        </CustomModal>
    )
}