import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default MainLayout 
