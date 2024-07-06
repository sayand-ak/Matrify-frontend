import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";
import { addDocs } from "../../../services/userAPI";
import showToast from "../../../components/Toast/Toast";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function CollectDocs() {
    const [educationDocs, setEducationDocs] = useState<File | null>(null);
    const [professionDocs, setProfessionDocs] = useState<File | null>(null);
    const [educationError, setEducationError] = useState<string>("");
    const [professionError, setProfessionError] = useState<string>("");

    const user = useAppSelector((state) => state.user.user);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    

    const handleEducationDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setEducationDocs(file);
            setEducationError("");
        } else {
            setEducationError("Please select a file");
        }
    };

    const handleProfessionDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setProfessionDocs(file);
            setProfessionError("");
        } else {
            setProfessionError("Please select a file");
        }
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
    
            if (!educationDocs) {
                setEducationError("Please select education-related documents");
            }
            else if (!professionDocs) {
                setProfessionError("Please select profession-related documents");
            }
            else{
                const formData = new FormData();
                formData.append("id", user?._id || "");
    
                formData.append('educationDocs', educationDocs);
                formData.append('professionDocs', professionDocs);
    
                const response = await dispatch(addDocs(formData));
    
                if(response.payload.success){
                    showToast("success", "Documents added successfully", () => {
                        navigate("/home");
                    })
                }else{
                    showToast("error", "Failed to add documents");
                }
            }
            
        } catch (error) {
            navigate("/500")
        }
    };

    return (
        <div className="h-[100vh] flex items-center justify-center">
            <div className="flex flex-col-reverse w-full h-full md:flex-row md:w-[65vw] md:max-h-[600px] md:rounded-[50px] overflow-hidden bg-black">
                <div className="form-container flex-1 flex justify-center bg-[#f4f4f4] rounded-t-[50px] md:rounded-none">
                    <form
                        action="#"
                        className="flex flex-col gap-10 w-[80%] items-center justify-center md:items-start mt-12 md:mt-10"
                        onSubmit={handleSubmit}
                    >
                        <h1 className="heading font-semibold text-3xl font-gillroy">You are almost there</h1>

                        <div className="w-full input-container">
                            <label htmlFor="educationDocs" className="text-sm font-semibold">
                                Education related Docs
                            </label>
                            <div className="flex h-[45px] overflow-hidden rounded-md w-full border border-[#6d6d6d59] relative">
                                <div className="h-15 w-3/4 flex items-center px-4">
                                    <p className="truncate w-[240px]">
                                        {educationDocs ? educationDocs?.name : "choose a file" }
                                    </p>
                                </div>
                                <div 
                                    className="h-15 bg-[#6d6d6d59] w-1/4 flex items-center justify-center cursor-pointer font-semibold text-[#474646]"
                                >Browse
                                </div>
                                <input
                                    type="file"
                                    id="educationDocs"
                                    className="opacity-0 absolute top-0 h-12 w-full px-4 py-2"
                                    onChange={handleEducationDocsChange}
                                />
                            </div>
                            {<div className="text-red-500 text-sm h-4">{educationError}</div>}
                        </div>

                        <div className="w-full input-container">
                            <label htmlFor="professionDocs" className="text-sm font-semibold">
                                Profession related Docs
                            </label>
                            <div className="flex h-[45px] overflow-hidden rounded-md w-full border border-[#6d6d6d59] relative">
                                <div className="h-15 w-3/4 flex items-center px-4 truncate">
                                    <p className="truncate w-[240px]">
                                        {professionDocs ? professionDocs?.name : "choose a file" }
                                    </p>
                                </div>
                                <div 
                                    className="h-15 bg-[#6d6d6d59] w-1/4 flex items-center justify-center cursor-pointer font-semibold text-[#474646]"
                                >Browse
                                </div>

                                <input
                                    type="file"
                                    id="professionDocs"
                                    className="opacity-0 absolute top-0  h-12 w-full"
                                    onChange={handleProfessionDocsChange}
                                />
                            </div>
                            {<div className="text-red-500 text-sm h-4">{professionError}</div>}
                        </div>


                        <div className="flex flex-col w-full items-center mb-5">
                            <button
                                type="submit"
                                className="w-[200px] px-5 py-2  md:mt-2 rounded-md bg-[#1b2931] text-white font-semibold"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                <div
                    className="image-container h-[700px] md:h-full md:flex-1 flex items-start pt-10 text-[#b5b4b4]"
                    style={{
                        backgroundImage: `url(${"../src/assets/images/welcomePage.jpg"})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center" ,
                    }}
                >
                    <div className="flex flex-col justify-start items-center w-full h-full md:h-[full]">
                        <h1 className="text-[#c6bbb6] font-semibold font-gillroy text-3xl md:text-3xl">
                            Welcome to MATRIFY
                        </h1>
                        <p className="hidden md:block text-[#c6bbb6]">It's time to get married</p>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        </div>
    );
}


export default CollectDocs;