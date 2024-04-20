import React from 'react'
import MainLayout from '../Layout/MainLayout'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { logOutUser } from '../redux/slices/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
    const { user } = useAppSelector(state => state.User);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const logout = async () => {
        try {
            dispatch(logOutUser());
            toast.success(`User logged out successfully`);
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <MainLayout>
            <div className='max-w-xl p-4 xs:p-8 sm:border sm:rounded-md sm:shadow-lg my-8 md:my-16 mx-auto '>
                <h1 className='text-2xl xs:text-3xl font-semibold text-center mb-6 xs:mb-8'>My Profile</h1>
                <div className='grid grid-cols-12 gap-y-6 xs:gap-x-6'>
                    <div className='col-span-12 xs:col-span-4'>
                        <img
                            src={user ? user.photo.url : "https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg"}
                            alt="person"
                            className="w-3/4 mx-auto xs:w-full h-auto max-xs:max-h-[15rem] rounded-md object-cover"
                        />
                    </div>
                    <div className=' col-span-8 space-y-2'>
                        <div className='flex items-center space-x-2'>
                            <h1 className='font-semibold'>Username: </h1>
                            <p className='text-gray-700'>{user?.username}</p>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <h1 className='font-semibold'>Name: </h1>
                            <p className='text-gray-700'>{user?.name}</p>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <h1 className='font-semibold'>Email: </h1>
                            <p className='text-gray-700'>{user?.email}</p>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <h1 className='font-semibold'>Location: </h1>
                            <p className='text-gray-700'>{user?.location}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-center'>
                    <button
                        className='w-40 py-2.5 rounded-md bg-pink_1 text-white mt-6 mx-auto'
                        onClick={logout}
                    >Log out</button>
                </div>
            </div>
        </MainLayout>
    )
}

export default Profile
