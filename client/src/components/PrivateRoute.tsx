import React from 'react'
import { useAppSelector } from '../redux/store'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { token } = useAppSelector(state => state.User);
    const { isVerify } = useAppSelector(state => state.User.user); 
    if (token && isVerify) {
        return children
    } else return <Navigate to={"/register"} />;
}

export default PrivateRoute
