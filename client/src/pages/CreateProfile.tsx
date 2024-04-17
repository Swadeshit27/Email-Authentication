import React, { useState } from 'react'
import { MdCameraEnhance, MdExpandLess } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../components/Loader';
import { useAppDispatch } from '../redux/store';
import { uploadPhoto } from '../redux/slices/userSlice';
const token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

type detailsType = {
    photo: File | null,
    location: string,
}

const CreateProfile: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isVew, setIsview] = useState(false);
    const [loading, setLoading] = useState(false);

    const [details, setDetails] = useState<detailsType>({
        photo: null,
        location: "",
    });

    const UpdateDetails = async () => {
        try {
            setLoading(true);
            const { photo, location } = details;
            if (!photo || !location) return toast.error("Please provide all the fields");
            const formData = new FormData();
            formData.append('photo', photo);
            formData.append('location', location);
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/upload-profile`, formData);
            // console.log(data);
            dispatch(uploadPhoto(data.details));
            navigate('/preferences')
            toast.success(data.message);
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loader />;

    return (
        <section className='commonLayout'>
            <div className='w-full h-20 flex items-center'>
                <h1 className='font-dancing text-2xl font-bold text-pink_1'>dribble</h1>
            </div>
            <div className='w-full max-w-xl mx-auto py-6 md:py-12'>
                <h1 className='header'>Welcome! Let's create your profile</h1>
                <p className='subheader'>let others get to know you better! You can do these later</p>
                <h3 className='sm:text-xl font-semibold text-gray-900'>Add an avatar</h3>
                <div className='flex items-center space-x-6 my-3'>
                    <div className='w-24 h-24 border border-dashed rounded-full border-gray-600 flex items-center justify-center overflow-hidden'>
                        {
                            details.photo ?
                                <img src={URL.createObjectURL(details.photo)} alt="photo" /> :
                                <MdCameraEnhance size={24} className='text-gray-400' />
                        }
                    </div>
                    <div>
                        <div className='relative mb-3'>
                            <input type="file" className='w-32 z-40 opacity-0 py-1' accept='.jpg, .png, .jpeg'
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        setDetails({ ...details, photo: e.target.files[0] });
                                    }
                                }}
                            />
                            <button className='w-32 text-sm text-center border border-gray-300 rounded-md font-medium text-gray-700 py-2 absolute left-0 -z-10'>Choose image</button>
                        </div>
                        <div>
                            <div className='flex items-center text-gray-500 cursor-pointer text-xs xs:text-sm' onClick={() => setIsview(!isVew)}>
                                <MdExpandLess className={isVew ? "rotate-0" : 'rotate-90'} />
                                Or choose one of our defaults</div>
                        </div>
                    </div>
                </div>
                <div className='mt-4 sm:mt-8' >
                    <label htmlFor="location" className='text-gray-800 font-semibold'>Add your location</label>
                    <input type="text" placeholder='Enter a location' className='w-full border-b-2 p-1 outline-none my-2' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDetails({ ...details, location: e.target.value })} />
                </div>
                <button className={`btn mt-6`} onClick={UpdateDetails} >Next</button>
            </div>
        </section>
    )
}

export default CreateProfile 
