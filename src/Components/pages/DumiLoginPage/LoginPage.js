import React, { useState } from 'react';
import RoleSelection from '../../auth/DummyRoleSelection/RoleSelection';
import AuthForm from '../../auth/DummyAuthForm/AuthForm';
import Header from '../../layout/Header/Header'
import Footer from '../../layout/Footer/Footer';
import './LoginPage.css'

const LoginPage = ({ onAuth }) => {
    const [authState, setAuthState] = useState('role-selection');
    const [selectedRole, setSelectedRole] = useState(null);

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setAuthState('auth-form');
    };

    const handleAuth = (userData) => {
        onAuth(userData);
    };

    const handleBack = () => {
        setAuthState('role-selection');
        setSelectedRole(null);
    };

    return (
        <>
            <Header />
            <div className="auth-flow-container">
                <div className=" intro-box text-center mb-5">
                    <h1 className="role-selection-title">welcome back</h1>
                    <p className="role-selection-subtitle">Choose your role LOGIN</p>
                </div>

                {authState === 'role-selection' && (
                    <RoleSelection onRoleSelect={handleRoleSelect} />
                )}

                {authState === 'auth-form' && selectedRole && (
                    <AuthForm
                        authtype={"login"}
                        role={selectedRole}
                        onBack={handleBack}
                        onAuth={handleAuth}
                    />
                )}
            </div>
            <Footer />
        </>
    );
};

export default LoginPage;