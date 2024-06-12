import { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import "./inputField.css";
import { FormikValues, FormikErrors, FormikHelpers } from 'formik';


interface InputFieldProps {
    type: string;
    label: string;
    options?: string[]; 
    infoText?: string;
    name: string;
    value?: string;
    onChange?: (value: string) => void; 
    formik: {
        values: FormikValues;
        errors: FormikErrors<FormikValues>;
        setFieldValue: FormikHelpers<FormikValues>['setFieldValue'];
    };
}
export function InputField({ type, label, options, infoText, value, onChange, name, formik }: InputFieldProps) {
    const [imageName, setImageName] = useState("");
    const [showTooltip, setShowTooltip] = useState(false);    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const newValue = e.target.value;
        if (onChange) {
            onChange(newValue);
        }
        formik.setFieldValue(name, newValue); 

        if (e.target instanceof HTMLInputElement && e.target.type === "file" && e.target.files) {
            setImageName(e.target.files[0]?.name || "");
            formik.setFieldValue(name, e.target.files[0]);
        }
    };


    return (
        <>
            {
                type === "text" && 
                <div className="flex gap-2 flex-col w-3/4">
                    <label htmlFor="InputField">{label}</label>
                    <input 
                        type="text" 
                        id="InputField" 
                        name={name}
                        className="outline-none border-[1px] h-10 rounded-lg px-5"
                        value={value}
                        onChange={handleChange} 
                    />
                   <span className="text-red-500 h-2 text-sm">{formik.errors[name] as string}</span>
                </div>
            }

            {
                type === "textarea" && 
                <div className="flex gap-2 flex-col w-3/4">
                    <label htmlFor="InputField">{label}</label>
                    <textarea 
                        id="InputField" 
                        rows={5} 
                        cols={30} 
                        name={name}
                        className="outline-none border-[1px] h-20 rounded-lg px-5"
                        value={value} 
                        onChange={handleChange} 
                    ></textarea>
                    <span className="text-red-500 h-2 text-sm">{formik.errors[name] as string}</span>
                </div>
            }

            {
                
                type === "file" && 
                <div className="flex gap-2 flex-col w-3/4">
                    <label htmlFor="InputField">{label}</label>
                    <div className='relative border-[1px] flex rounded-md h-10 overflow-hidden'>
                        <p className='bg-gray-400 text-white w-[20%] font-bold h-full flex justify-center items-center'>Browse</p>
                        <p className='text-black w-full flex items-center pl-3 truncate'>{imageName}</p>
                        <input 
                            type="file" 
                            id="InputField" 
                            name={name}
                            className="top-0 opacity-0 w-full absolute outline-none border-[1px]"
                            onChange={handleChange}
                        />
                    </div>
                    <span className="text-red-500 h-2 text-sm">{formik.errors[name] as string}</span>
                </div>
            }
            {
                type === "dropdown" && 
                <div className="flex gap-2 flex-col w-3/4">
                    <label className="text-lg font-semibold flex items-center">
                        {label}
                        {infoText && (
                            <div
                                className="ml-2 relative"
                                onMouseOver={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >
                                <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
                                {showTooltip && (
                                    <div className="tooltip absolute bg-gray-700 text-white text-sm p-2 rounded shadow-lg">
                                        {infoText}
                                    </div>
                                )}
                            </div>
                        )}
                    </label>

                    {type === 'dropdown' && (
                        <select className="p-2 border rounded" value={value} onChange={handleChange} name={name}>
                            {options?.map((option, index) => (
                                <option key={index} value={option.toLowerCase()}>
                                    {option}
                                </option>
                            ))}
                        </select>)}
                        <span className="text-red-500 h-2 text-sm">{formik.errors[name] as string}</span>
                </div>
            }
        </>
    );
}
