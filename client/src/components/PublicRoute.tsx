import React from 'react'
import { useAppSelector } from '../redux/store'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { token } = useAppSelector(state => state.User);
    const { isVerify } = useAppSelector(state => state.User.user); 
    if (token && isVerify) {
        return <Navigate to={"/"} />
    } else return children;
}

export default PublicRoute