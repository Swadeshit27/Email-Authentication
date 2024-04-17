import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const Loader: React.FC = () => {
  return (
    <section className='w-full h-screen flex items-center justify-center'>
      <RotatingLines
        visible={true} 
        width="96" 
        strokeWidth="5"
        strokeColor='#EE119C'
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading" 
      />
    </section>
  )
}

export default Loader
