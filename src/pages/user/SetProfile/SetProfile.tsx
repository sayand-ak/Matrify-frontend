import { useEffect, useState } from "react";
import "./SetProfile.css";
import { handleImageChange } from "../../../utils/handleImageChange";
import { useFormik } from "formik";
import { ProfileFormData } from "../../../typings/Profile/profileTypes";
import { profileSchema } from "../../../utils/validations/validateProfileData";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";
import { getCitiesApi, getStateApiAccessToken, setProfile } from "../../../services/userAPI";
import showToast from "../../../components/Toast/Toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../components/loader/Loader";
import { ToastContainer } from "react-toastify";
import { states } from 'indian_address';


function SetProfile() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const emailExist:string | null = useAppSelector((state) => state.user.user?.email) || null;
    const phoneExist:string | null = useAppSelector((state) => state.user.user?.phone) || null;

    const [selectedState, setSelectedState] = useState<string>();  

    const [cities, setCities] = useState<string[]>([])

    const [loading , setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const selector = useAppSelector((state) => state.user.user);
    
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
    
    
    const formik = useFormik<ProfileFormData>({
        initialValues: {
            email: emailExist || "",
            phone: phoneExist || "",
            dob: "",
            motherTongue: "",
            state: "",
            district: "",
            gender: "",
            height: 0,
        },

        validationSchema: profileSchema,
        onSubmit: async(values) => {  
            //set to loading state
            setLoading(true);
            
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
                formData.append("image", imageFile); 
            }
            
            //get the response from the api
            const response = await dispatch(setProfile(formData));
                        
           if(response.payload.success){
                setLoading(false);
                showToast("success", "Profile updated successfully", () => {
                    navigate("/setProfession");
                });
            }else{
                setLoading(false);
                showToast("error", "Something went wrong", () => {
                    navigate("/setProfile");
                });
           }
        },
    });

  return (
    <div className="h-[fit-content] md:h-[100vh] flex items-center justify-center">
      <div className="login-card-container flex flex-col-reverse w-full h-full md:flex-row md:w-[65vw] md:h-[80vh] md:rounded-[50px] overflow-hidden">
        <div className="form-container flex-1 flex justify-center bg-[#f4f4f4]">
          <form
            className="flex flex-col gap-2 w-[80%] items-center md:items-start mt-14"
            onSubmit={formik.handleSubmit}
          >
            <h1 className="heading font-semibold text-2xl font-gillroy hidden md:block pb-2">
              Tell us more about you
            </h1>
            {!emailExist &&
                (<div className="w-full flex flex-col">
                    <label
                        htmlFor="email"
                        className="text-sm font-semibold pb-2"
                    >
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        className="py-4 px-4 outline-none w-full rounded-md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        disabled={loading}
                    />
                    {(
                        <div className="error text-[12px] text-red-600 h-2">
                            {formik.errors.email}
                        </div>
                    )}
                </div>
                )}

            {!phoneExist &&
                (<div className="w-full flex flex-col">
                    <label
                        htmlFor="phone"
                        className="text-sm font-semibold pb-2"
                    >
                        Phone
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="py-4 px-4 outline-none w-full rounded-md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        disabled={loading}
                    />
                    {(
                        <div className="error text-[12px] text-red-600 h-2">
                            {formik.errors.phone}
                        </div>
                    )}
                </div>
                )}



            <div className="flex gap-3 w-full ">
                <div className="w-full flex flex-col">
                <label
                    htmlFor="dob"
                    className="text-sm font-semibold pb-2"
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
                    disabled={loading}
                />
                {(
                    <div className="error text-[12px] text-red-600 h-2">
                    {formik.errors.dob}
                    </div>
                )}
                </div>

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
                        disabled={loading} 
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

            </div>

            <div className="flex gap-3 w-full">
                <div className="w-full flex flex-col">
                    <label
                        htmlFor="state"
                        className="text-sm font-semibold pb-2"
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

                        disabled={loading}
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
                        className="text-sm font-semibold pb-2"
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
                        disabled={loading}
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
                        <div className="error text-[12px] text-red-600 h-2">
                        {formik.errors.district}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-2 w-full">
                <div className="w-full flex flex-col">
                <label
                    htmlFor="gender"
                    className="text-sm font-semibold pb-2"
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
                    disabled={loading}
                >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {(
                    <div className="error text-[12px] text-red-600 h-2">
                    {formik.errors.gender}
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
                    disabled={loading}
                />
                {(
                    <div className="error text-[12px] text-red-600 h-2">
                    {formik.errors.height}
                    </div>
                )}
                </div>
            </div>


            <div className="flex flex-col gap-2 w-full items-center">
                <button
                    type="submit"
                    className="px-5 py-2 my-10 rounded-md bg-[#1B2931] text-white font-semibold w-[200px] flex items-center justify-center"
                >
                    {loading ? <Loader dimension={40}/> : "Proceed"}
                </button>
            </div>
            <ToastContainer/>
          </form>
        </div>

        <div>
            <h1 className="heading font-semibold text-2xl font-gillroy block md:hidden bg-[#f4f4f4] text-center p-[20px]">
              Tell us more about you
            </h1>
            <div className="image-container px-7 p-[10px] md:h-full md:flex-1 flex items-center justify-center bg-[#f4f4f4] border-l-[1px]">
                <div
                    className="relative rounded-full w-[250px] h-[250px] md:w-[350px] md:h-[350px] border-[1px] border-[#c4c1c1]"
                        style={{
                        backgroundImage: `url(${
                            imageUrl ? imageUrl : "../src/assets/images/profile.png"
                        })`,
                        backgroundSize: "cover",
                        }}
                >
                    <input
                        type="file"
                        className="w-full h-full opacity-0"
                        onChange={(e) => handleImageChange(e, setImageUrl, setImageFile)}
                        disabled={loading}
                    />
                    <div
                        className="bg-white rounded-full h-[60px] w-[60px] absolute bottom-2 right-9 flex"
                        style={{
                            backgroundImage: `url(${"../src/assets/images/plus_9202063.png"})`,
                            backgroundSize: "cover",
                        }}
                    ></div>
                </div>
            </div>  
        </div>
      </div>
    </div>
  );
}


export default SetProfile