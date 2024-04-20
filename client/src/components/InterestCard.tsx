import React from 'react'
import { motion } from "framer-motion"

const InterestCard: React.FC<interestedCardType> = ({ id, title, imgUrl, para, onCheck }) => {

    return (
        <>
            <motion.div layout className=' w-full max-w-sm mx-auto h-60 rounded-md border-2 p-4 relative'>
                <motion.div initial={{ y: 0 }} whileHover={{ y: -50 }} transition={{ ease: "easeInOut", delay: 0.3, duration: 0.5 }} className='group'>
                    <div className='w-full h-32 flex items-center justify-center mb-3'>
                        <img src={imgUrl} alt="card-image" className='w-auto h-auto max-h-full object-contain' />
                    </div>
                    <h1 className='text-sm font-semibold text-center'>{title}</h1>
                    <p className='hidden group-hover:flex group-hover:transition-all group-hover:delay-500 group-hover:duration-1000 group-hover:ease-in text-xs leading-4 text-center text-gray-500 my-1' >{para}</p>
                </motion.div>
                <div className='w-full absolute bottom-2 left-[50%] mt-2 justify-center'>
                    <input type="checkbox"
                        className='w-4 h-4 rounded-full mx-auto accent-pink_1'
                        onChange={() => onCheck(title, id)}
                    />
                </div>
            </motion.div>
        </>
    )
}

export default InterestCard
