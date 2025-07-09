import React from 'react';
import Loading from '../../components/Loading'
import useUserRole from '../../hooks/useUserRole';
import UserDashboard from './UserDashboard';
import MemberDashboard from './MemberDashboard';

const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <Loading></Loading>
    }

    if(role === 'user'){
        return <UserDashboard></UserDashboard>
    }
    if (role === 'member') {
    return <MemberDashboard />;
  }
    else {
        return <Forbidden></Forbidden>
    }

};

export default DashboardHome;