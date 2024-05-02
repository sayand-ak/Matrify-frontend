import React, { useState } from "react";

export function CollectDocs() {
    const [educationDocs, setEducationDocs] = useState<File | null>(null);
    const [professionDocs, setProfessionDocs] = useState<File | null>(null);
    const [educationError, setEducationError] = useState<string>("");
    const [professionError, setProfessionError] = useState<string>("");

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!educationDocs) {
            setEducationError("Please select education-related documents");
        }
        if (!professionDocs) {
            setProfessionError("Please select profession-related documents");
        }
    };

    return (
        <div className="h-[100vh] flex items-center justify-center">
            <div className="familyDetails-card-container flex flex-col-reverse w-full h-full md:flex-row md:w-[65vw] md:max-h-[600px] md:rounded-[50px] overflow-hidden bg-black">
                <div className="form-container flex-1 flex justify-center bg-[#f4f4f4] rounded-t-[50px] md:rounded-none">
                    <form
                        action="#"
                        className="flex flex-col gap-14 w-[80%] items-center justify-center md:items-start mt-12 md:mt-10"
                        onSubmit={handleSubmit}
                    >
                        <h1 className="heading font-semibold text-3xl font-gillroy">You are almost there</h1>

                        <div className="w-full input-container">
                            <label htmlFor="educationDocs" className="text-sm font-semibold">
                                Education related Docs
                            </label>
                            <input
                                type="file"
                                id="educationDocs"
                                className="py-4 px-4 outline-none w-full rounded-md"
                                onChange={handleEducationDocsChange}
                            />
                            {educationError && <div className="text-red-500">{educationError}</div>}
                        </div>

                        <div className="w-full input-container">
                            <label htmlFor="professionDocs" className="text-sm font-semibold">
                                Profession related Docs
                            </label>
                            <input
                                type="file"
                                id="professionDocs"
                                className="py-4 px-4 outline-none w-full rounded-md"
                                onChange={handleProfessionDocsChange}
                            />
                            {professionError && <div className="text-red-500">{professionError}</div>}
                        </div>

                        <div className="flex flex-col w-full">
                            <button
                                type="submit"
                                className="w-[100px] px-5 py-2  md:mt-2 rounded-md bg-[#dd742a] text-white font-semibold"
                            >
                                Proceed
                            </button>
                        </div>
                    </form>
                </div>

                <div
                    className="image-container h-[300px] md:h-full md:flex-1 flex items-start pt-10 text-[#b5b4b4]"
                    style={{
                        backgroundImage: `url(${"../src/assets/images/welcome.jpg"})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="flex flex-col justify-center items-center w-full p-5 h-full md:h-[100px]">
                        <h1 className="text-[#b5b4b4] text-lg font-semibold font-gillroy md:text-3xl">
                            Welcome to MATRIFY
                        </h1>
                        <p>It's time to get married</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
