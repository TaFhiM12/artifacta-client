import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';

const PrivateRoutes = ({children}) => {
    const {user  , loading} = use(AuthContext);
    const location = useLocation();
    if(loading){
        return <span className="loading loading-bars loading-xl"></span>
    }
    if(!user){
        return <Navigate state={location.pathname} to='/login'/>
    }
    return children;
};

export default PrivateRoutes;