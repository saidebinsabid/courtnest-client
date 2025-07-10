import React, { Children } from 'react';
import Loading from '../components/Loading'
import { Navigate } from 'react-router';
import useUserRole from '../hooks/useUserRole';
import useAuth from '../hooks/useAuth';

const MemberRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (!user || role !== 'member') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default MemberRoute;