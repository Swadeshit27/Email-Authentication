import React from 'react'
import { motion } from "framer-motion"

const InterestCard: React.FC<interestedCardType> = ({ id, title, imgUrl, para, onCheck }) => {

    return (
        <>
            <motion.div layout className='w-full max-w-sm mx-auto h-60 rounded-md border-2 p-4 group'>
                <motion.div initial={{ y: 0 }} whileHover={{ y: -50 }} transition={{ ease: "easeInOut", delay: 0.3, duration: 0.5 }}>
                    <div className='w-full h-32 flex items-center justify-center mb-3'>
                        <img src={imgUrl} alt="card-image" className='w-auto h-auto max-h-full object-contain' />
                    </div>
                    <h1 className='text-sm font-semibold text-center'>{title}</h1>
                    <motion.p initial={{ opacity: 1, display: "none", translateY: -20 }} whileHover={{ opacity: 1, translateY: -50, display: "flex" }} transition={{ ease: "easeInOut", delay: 0.3, duration: 1 }} className='text-xs leading-4 text-center text-gray-500 my-1 flex' >{para}</motion.p>
                </motion.div>
                <div className='w-full flex mt-2 justify-center'>
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
