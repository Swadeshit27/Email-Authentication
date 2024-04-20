import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import Verified from "../assets/verified.gif"
import Unverified from "../assets/not verifed.webp"
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { updateVerify } from '../redux/slices/userSlice';

const EmailVerification: React.FC = () => {
    const [isVerify, setIsVerify] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const VerifyEmail = async () => {
        try {
            setLoading(true);
            const token = window.location.search.split("=")[1];
            await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/auth/verify-email`, { token });
            dispatch(updateVerify());
            console.log("email verified ");
            setIsVerify(true);
        } catch (error) {
            console.log(error); 
            setIsVerify(false);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        VerifyEmail();
    }, []);

    if (loading) return <Loader />

    return (
        <section className='w-full h-screen flex items-center justify-center'>
            <div className='max-w-xl mx-auto py-12 flex flex-col justify-center'>
                {
                    isVerify ?
                        <img src={Verified} alt="approved" className='max-w-md object-contain' />
                        :
                        <img src={Unverified} alt="approved" className='w-20 mx-auto object-contain' />
                }
                <h1 className={`text-center font-semibold my-3 ${isVerify ? "text-green-500" : "text-red-500"}`}>{isVerify ? "Verified" : " Unverified"}</h1>
                <Link to={isVerify ? "/" : "/send-verification"} className='w-40 mx-auto'>
                    <button className='w-full py-2.5 rounded-md bg-pink_1 text-white'>{isVerify ? "Home" : "Verification"}</button>
                </Link>
            </div>
        </section>
    )
}

export default EmailVerification
