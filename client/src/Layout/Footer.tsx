import React from 'react'
import { FaDribbble, FaFacebookF, FaInstagram, FaPinterest, FaTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { FooterItems } from '../utils/FooterItems'

const Footer: React.FC = () => {
    return (
        <section className='w-full min-h-40 py-6 md:py-12 bg-gray-50'>
            <footer className='commonLayout xl:flex flex-wrap'>
                <div className='xl:w-1/5 max-xl:flex items-center justify-between xl:pe-4'>
                    <div className='max-xl:pe-8'>
                        <h1 className='text-pink_1 font-dancing font-bold text-3xl'>dribble</h1>
                        <p className='text-sm text-gray-600 my-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero, nostrum!</p>
                    </div>
                    <div className='max-md:hidden xl:mt-6 flex items-center space-x-4 text-gray-600'>
                        <Link to={'/'}><FaDribbble /></Link>
                        <Link to={'/'}><FaTwitter /></Link>
                        <Link to={'/'}><FaFacebookF /></Link>
                        <Link to={'/'}><FaInstagram /></Link>
                        <Link to={'/'}><FaPinterest /></Link>
                    </div>
                </div>
                <div className='xl:w-4/5 ps-4 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8 max-xs:my-6 max-xl:my-8'>
                    {
                        FooterItems.map(ele => (
                            <div key={ele.title}>
                                <h1 className='font-medium text-gray-900 mb-2 '>{ele.title}</h1>
                                <div className='text-gray-600 text-sm space-y-2'>
                                    {
                                        ele.items.map(item => (
                                            <Link key={item.name} to={item.path} className=' block'>{item.name}</Link>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='w-full flex items-center  space-y-2 flex-wrap justify-between pt-6 md:pt-8 text-sm text-gray-600 border-t'>
                    <p>2023 Dribble. All rights reserved.</p>
                    <p><span>20,501,853</span> shots dribbled</p>
                </div>
            </footer>
        </section>
    )
}

export default Footer 
