import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'
import * as yup from "yup"
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = yup.object({
        email: yup.string().email("Enter valid email").required("Email is required"),
        password: yup.string().required("Password is required"),
    })

    const LoginUser = async (value: UserType) => {
        try {
            setLoading(true);
            const { data } = await axios.post('http://localhost:8080/auth/login', value);
            console.log(data);
            localStorage.setItem('token', data.token);
            toast.success(data.message);
            navigate('/');
        } catch (error: any) {
            console.log(error);
            const errMsg = error?.response?.data.message;
            setErrorMsg(errMsg ? errMsg : "Something went wrong");
        } finally {
            setLoading(false)
        }
    }
    if (loading) return <Loader />
    return (
        <>
            <section className='w-full h-screen grid md:grid-cols-2 gap-x-6 lg:gap-x-12'>
                <div className='w-full h-full max-md:hidden'>
                    <img src="https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVnaXN0cmF0aW9ufGVufDB8MXwwfHx8MA%3D%3D" alt="side image" className='w-3/4 h-screen object-cover' />
                </div>
                <div className='w-full max-md:max-w-lg mx-auto h-full overflow-y-auto xs:py-4'>
                    <p className='text-end px-12 font-medium max-md:hidden'>Not a member ? <Link className='text-blue-600' to={'/register'}>Sign Up</Link></p>
                    <div className='xl:w-3/5 max-xs:p-4 max-xl:px-8 my-3 xs:my-6'>
                        <h1 className='text-2xl xs:text-3xl font-semibold mb-2.5 xs:mb-4'>Login to dribble</h1>
                        {
                            <p className='text-red-500 mb-3'>{errorMsg}</p>
                        }
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            onSubmit={(value) => LoginUser(value)}
                            validationSchema={validate}
                        >{() => (
                            <Form className='space-y-4'>
                                <InputField type='text' name='email' placeholder='Email address' label='Email' />
                                <InputField type='password' name='password' placeholder='6+ characters' label='password' />

                                <button type='submit' className={`w-52  text-white rounded-md py-2.5  bg-pink_1`}>Create Account</button>
                                <p className='text-xs text-gray-500'>this site is protected by reCAPTCHA and the Google <span className='text-blue-800'> Privacy</span> and <span className='text-blue-800'>Terms of Service </span> apply.</p>
                            </Form>
                        )}
                        </Formik>
                        <p className='font-medium mt-4 md:hidden'>Not a member ? <Link className='text-blue-600' to={'/register'}>Sign Up</Link></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login 
