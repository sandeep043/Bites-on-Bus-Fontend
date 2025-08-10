import React, { useState } from 'react';
import Sidebar from '../../layout/Sidebar/Sidebar';
import Overview from '../../layout/Overview/Overview';
import RestaurantRegistration from '../../layout/RestaurantRegistration/RestaurantRegistration';
import DeliveryAgentRegistration from '../../layout/DeliveryAgentRegistration/DeliveryAgentRegistration';
import './AdminDashBoard.css';
import UserManagement from '../../layout/UserManagement/UserManagement';

const AdminDashboard = () => {
    const [activeView, setActiveView] = useState('overview');

    const AdminData = localStorage.getItem('adminData');
    console.log(AdminData);

    const renderActiveView = () => {
        switch (activeView) {
            case 'overview':
                return <Overview />;
            case 'users':
                return <UserManagement />;
            case 'restaurants':
                return <RestaurantRegistration />;
            case 'delivery':
                return <DeliveryAgentRegistration />;
            default:
                return <Overview />;
        }
    };

    return (
        <div className="dashboard">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
            <div className="main-content">
                <div className="content-wrapper">
                    {renderActiveView()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;