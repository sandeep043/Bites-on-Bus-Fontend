import React, { useState } from 'react';
import Sidebar from '../../layout/Sidebar/Sidebar';
import Overview from '../../layout/Overview/Overview';
import RestaurantRegistration from '../../layout/RestaurantRegistration/RestaurantRegistration';
import DeliveryAgentRegistration from '../../layout/DeliveryAgentRegistration/DeliveryAgentRegistration';
import './AdminDashBoard.css';
import UserManagement from '../../layout/UserManagement/UserManagement';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const AdminDashboard = () => {
    const location = useLocation();
    const [activeView, setActiveView] = useState('overview');

    const { role, response } = location.state || {}// Mocked for this example  
    console.log("role", role);
    console.log("response", response);




    const adminLocalStorage = localStorage.getItem('adminData')
        ? JSON.parse(localStorage.getItem('adminData'))
        : null;
    console.log('adminLocalStorage', adminLocalStorage);
    const token = adminLocalStorage?.token; // Get the token from localStorage
    console.log('token', token);



    const renderActiveView = () => {
        switch (activeView) {
            case 'overview':
                return <Overview />;
            case 'users':
                return <UserManagement token={token} />;
            case 'restaurants':
                return <RestaurantRegistration token={token} />;
            case 'delivery':
                return <DeliveryAgentRegistration token={token} />;
            default:
                return <Overview />;
        }
    };

    return (
        <> <ToastContainer />
            <div className="dashboard">
                <Sidebar activeView={activeView} setActiveView={setActiveView} />
                <div className="main-content">
                    <div className="content-wrapper">
                        {renderActiveView()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;