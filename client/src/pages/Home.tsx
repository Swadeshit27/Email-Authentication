import React from 'react'
import MainLayout from '../Layout/MainLayout'

const Home: React.FC = () => {
    return (
        <MainLayout>
            <div className='w-full max-w-xl mx-auto mb-12'>
                <img src="https://img.freepik.com/free-vector/namaste-greeting-decorative-background_23-2147691320.jpg?w=740&t=st=1713040326~exp=1713040926~hmac=7302cac7afa16eb3dc7ed85b306d21b90c39cf8cf989b7de397470edd39627a9" alt="home-img" />
                <h1 className='text-2xl xs:text-3xl md:text-4xl font-semibold text-center my-4'>Welcome to <span className=' font-dancing text-pink_1 font-bold text-3xl xs:text-4xl md:text-6xl ms-2'>dribble</span></h1>
            </div>
        </MainLayout>
    )
}

export default Home
