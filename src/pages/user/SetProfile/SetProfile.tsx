import { useState } from "react";
import "./SetProfile.css";
import { handleImageChange } from "../../../utils/handleImageChange";
import { useFormik } from "formik";
import { ProfileFormData } from "../../../typings/Profile/profileTypes";
import { profileSchema } from "../../../utils/validations/validateProfileData";

export function SetProfile() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const formik = useFormik<ProfileFormData>({
    initialValues: {
      email: "",
      dob: "",
      motherTongue: "",
      state: "",
      district: "",
      gender: "",
      height: 0,
    },

    validationSchema: profileSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    //   if(imageUrl){
        
    //   }
    },
  });

  return (
    <div className="h-[fit-content] md:h-[100vh] flex items-center justify-center">
      <div className="login-card-container flex flex-col-reverse w-full h-full md:flex-row md:w-[65vw] md:h-[80vh] md:rounded-[50px] overflow-hidden">
        <div className="form-container flex-1 flex justify-center bg-[#f4f4f4]">
          <form
            className="flex flex-col gap-6 w-[80%] items-center md:items-start mt-20"
            onSubmit={formik.handleSubmit}
          >
            <h1 className="heading font-semibold text-2xl font-gillroy hidden md:block">
              Tell us more about you
            </h1>
            <div className="w-full relative">
              <label
                htmlFor="email"
                className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
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
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error text-[12px] text-red-600">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="flex gap-2 w-full">
                <div className="w-full relative">
                <label
                    htmlFor="dob"
                    className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
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
                {formik.touched.dob && formik.errors.dob && (
                    <div className="error text-[12px] text-red-600">
                    {formik.errors.dob}
                    </div>
                )}
                </div>

                <div className="w-full relative">
                <label
                    htmlFor="motherTongue"
                    className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                >
                    Mother Tongue
                </label>
                <input
                    type="text"
                    id="motherTongue"
                    name="motherTongue"
                    className="py-4 px-4 outline-none w-full rounded-md"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.motherTongue}
                />
                {formik.touched.motherTongue && formik.errors.motherTongue && (
                    <div className="error text-[12px] text-red-600">
                    {formik.errors.motherTongue}
                    </div>
                )}
                </div>
            </div>

            <div className="flex gap-2 w-full">
                <div className="w-full relative">
                <label
                    htmlFor="state"
                    className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                >
                    State
                </label>
                <input
                    type="text"
                    id="state"
                    name="state"
                    className="py-4 px-4 outline-none w-full rounded-md"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.state}
                />
                {formik.touched.state && formik.errors.state && (
                    <div className="error text-[12px] text-red-600">
                    {formik.errors.state}
                    </div>
                )}
                </div>

                <div className="w-full relative">
                <label
                    htmlFor="district"
                    className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                >
                    District
                </label>
                <input
                    type="text"
                    id="district"
                    name="district"
                    className="py-4 px-4 outline-none w-full rounded-md"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.district}
                />
                {formik.touched.district && formik.errors.district && (
                    <div className="error text-[12px] text-red-600">
                    {formik.errors.district}
                    </div>
                )}
                </div>
            </div>

            <div className="flex gap-2 w-full">
                <div className="w-full relative">
                <label
                    htmlFor="gender"
                    className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
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
                {formik.touched.gender && formik.errors.gender && (
                    <div className="error text-[12px] text-red-600">
                    {formik.errors.gender}
                    </div>
                )}
                </div>

                <div className="w-full relative">
                <label
                    htmlFor="height"
                    className="absolute transition-all duration-300 -top-2 left-4 text-sm font-semibold"
                >
                    Height
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
                {formik.touched.height && formik.errors.height && (
                    <div className="error text-[12px] text-red-600">
                    {formik.errors.height}
                    </div>
                )}
                </div>
            </div>


            <div className="flex flex-col gap-2 w-full">
              <button
                type="submit"
                className="w-[100px] px-5 py-2 my-10 rounded-md bg-[#dd742a] text-white font-semibold hover:bg-[#999999]"
              >
                Proceed
              </button>
            </div>
          </form>
        </div>

        <div>
            <h1 className="heading font-semibold text-2xl font-gillroy block md:hidden bg-[#f4f4f4] text-center p-[20px]">
              Tell us more about you
            </h1>
            <div className="image-container p-[10px] md:h-full md:flex-1 flex items-center justify-center bg-[#f4f4f4] border-l-[1px]">
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
                onChange={(e) => handleImageChange(e, setImageUrl)}
                />
                <div
                className="bg-white rounded-full h-[60px] w-[60px] absolute bottom-2 right-9 flex"
                style={{
                    backgroundImage: `url(${"../src/assets/images/add_10307926.png"})`,
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
