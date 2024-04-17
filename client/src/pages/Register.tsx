import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'
import * as yup from "yup"
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useAppDispatch } from '../redux/store'
import { registerUser } from '../redux/slices/userSlice'

const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [errorMsg, setErrorMsg] = useState('');
    const [isAccept, setIsAccept] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = yup.object({
        name: yup.string().required("Name is required"),
        username: yup.string().required("Username is required"),
        email: yup.string().email("Enter valid email").required("Email is required"),
        password: yup.string().required("Password is required"),
    })

    const register = async (value: UserType) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, value);
            const { user: { email, _id }, token } = data;
            dispatch(registerUser({ email, token, userId: _id }));
            toast.success(data.message);
            navigate('/create-profile');
        } catch (error: any) {
            const errMsg = error?.response?.data.message;
            setErrorMsg(errMsg ? errMsg : "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loader />;

    return (
        <>
            <section className='w-full h-screen grid md:grid-cols-2 gap-x-6 lg:gap-x-12'>
                <div className='w-full h-full max-md:hidden'>
                    <img src="https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVnaXN0cmF0aW9ufGVufDB8MXwwfHx8MA%3D%3D" alt="side image" className='xl:w-3/4 h-screen object-cover' />
                </div>
                <div className='w-full max-md:max-w-lg mx-auto h-full overflow-y-auto xs:py-4'>
                    <p className='text-end px-12 font-medium max-md:hidden'>Already a member ? <Link className='text-blue-600' to={'/login'}>Sign In</Link></p>
                    <div className='xl:w-3/5 max-xs:p-4 max-xl:px-8 my-3 xs:my-6'>
                        <h1 className='text-2xl xs:text-3xl font-semibold mb-2.5 xs:mb-4'>Sign up to dribble</h1>
                        {
                            <p className='text-red-500 mb-3'>{errorMsg}</p>
                        }
                        <Formik
                            initialValues={{
                                name: "",
                                username: "",
                                email: "",
                                password: "",
                            }}
                            onSubmit={(value) => register(value)}
                            validationSchema={validate}
                        >{() => (
                            <Form className='space-y-4'>
                                <div className='grid grid-cols-2 gap-x-6'>
                                    <InputField type='text' name='name' placeholder='Full Name' label='name' />
                                    <InputField type='text' name='username' placeholder='Username' label='username' />
                                </div>
                                <InputField type='text' name='email' placeholder='Email address' label='Email' />
                                <InputField type='password' name='password' placeholder='6+ characters' label='password' />
                                <div className='my-2'>
                                    <input type="checkbox" name="terms" className='w-4 h-4 border-gray-600' onChange={() => setIsAccept(!isAccept)} />
                                    <label htmlFor="terms" className='text-sm text-gray-600 leading-3 ms-2'>Creating an account means you're okay with our <span className='text-blue-800'>Terms of Service, Privacy Policy</span> and our default <span className='text-blue-800'>Notification Settings.</span></label>
                                </div>
                                <button type='submit' disabled={!isAccept} className={`w-52  text-white rounded-md py-2.5 ${!isAccept ? "bg-pink-300" : "bg-pink_1"}`}>Create Account</button>
                                <p className='text-xs text-gray-500'>this site is protected by reCAPTCHA and the Google <span className='text-blue-800'> Privacy</span> and <span className='text-blue-800'>Terms of Service </span> apply.</p>
                            </Form>
                        )}
                        </Formik>
                        <p className='font-medium mt-4 md:hidden'>Already a member ? <Link className='text-blue-600' to={'/login'}>Sign In</Link></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register 
