import { ErrorMessage, useField } from "formik";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps {
    label: string;
    name: string;
    placeholder?: string;
    type: string;
    isPass?: boolean;
    onChange?: (value: any) => void;
    value?: any;
}

const InputField: React.FC<InputFieldProps> = ({ label, isPass = false, type, ...props }) => {
    const [view, setView] = useState(false);
    const [field, meta] = useField(props);
    return (
        <>
            <div className=''>
                <label
                    htmlFor={field.name}
                    className=' text-sm font-medium mb-1.5 capitalize'
                >
                    {label}
                </label>
                <div className="relative">
                    <input
                        {...field}
                        type={view ? 'text' : type}
                        {...props}
                        className={`w-full bg-gray-100 rounded-md py-2 px-3 outline-none ${meta.touched && meta.error && "bg-red-100 text-red-600 placeholder:text-red-600"}`}
                    />
                    {isPass &&
                        <div className={`text-xl absolute right-3 top-3 ${isPass && 'cursor-pointer'}`} onClick={() => setView(!view)}>
                            {view ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    }
                </div>
                <ErrorMessage component={'div'} name={field.name} className="text-red-600 text-xs pt-1 " />
            </div >
        </>
    )
}
export default InputField