import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate } from 'react-router';
import Loading from '../pages/Loading';

const PrivateRoute = ({children}) => {
    const { user, loading } = use(AuthContext);
    //console.log(user);
    

    if (loading){
        return <Loading></Loading>;
    }

    if (user && user?.email){
        return children;
    }
    return <Navigate to='/auth/login'></Navigate>
};

export default PrivateRoute;