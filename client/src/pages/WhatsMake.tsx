import axios from 'axios';
import React, { useState } from 'react'
import { MdExpandLess } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { CardItems } from '../utils/CardItems';
import InterestCard from '../components/InterestCard';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { UpdateInterest } from '../redux/slices/userSlice';

type props = {
    title: string,
    id: number
}

const WhatsMake: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [interest, setInterest] = useState<props[]>([]);

    const PushInterest = (title: string, id: number) => {
        if (interest.length < 0) {
            setInterest([{ title, id }]);
        }
        else {
            const ind = interest.findIndex(ele => ele.id === id);
            if (ind === -1) {
                setInterest([...interest, { title, id }])
            } else {
                setInterest((pre) => pre.filter(ele => ele.id !== id))
            }
        }
    }

    const updateDetails = async () => {
        if (interest.length === 0) return toast.error("Please select any interest");
        try {
            setLoading(true);
            await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/auth/interest`, interest); 
            dispatch(UpdateInterest(interest));
            navigate('/send-verification')
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loader />;

    return (
        <>
            <section className='commonLayout'>
                <div className='w-full h-20 flex items-center space-x-8'>
                    <h1 className=' font-dancing text-2xl font-bold text-pink_1'>dribble</h1>
                    <Link to={'/create-profile'}>
                        <button className='w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md'>
                            <MdExpandLess className='-rotate-90 text-2xl text-gray-600' />
                        </button>
                    </Link>
                </div>
                <div className='w-full max-w-3xl mx-auto py-8 md:py-12'>
                    <h1 className='header text-center'>What's bring you to Dribble? </h1>
                    <p className='subheader text-center'>Select the options best describe you. Don't worry, you can explore other options later.</p>
                    <div className='my-8 mt-16 max-md:space-y-12 grid grid-cols-1 md:grid-cols-3 gap-x-8'>
                        {
                            CardItems.map(item => (
                                <InterestCard {...item}
                                    onCheck={PushInterest}
                                    key={item.id}
                                />))
                        }
                    </div>
                    <h4 className='text-center font-medium text-gray-800'>Anything else? You can select multiple</h4>
                    <div className='btn cursor-pointer mx-auto mt-4' onClick={updateDetails}>Finish</div>
                </div>
            </section>
        </>
    )
}

export default WhatsMake 
