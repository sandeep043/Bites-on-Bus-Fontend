import React, { useState } from 'react';
import RoleSelection from '../../auth/DummyRoleSelection/RoleSelection';
import AuthForm from '../../auth/DummyAuthForm/AuthForm';
import Header from '../../layout/Header/Header'
import Footer from '../../layout/Footer/Footer';
import axios from 'axios';

import './SignupPage.css'

const SignupPage = () => {
    const [authState, setAuthState] = useState('role-selection');
    const [selectedRole, setSelectedRole] = useState(null);

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setAuthState('auth-form');
    };


    const postUser = async (formData, role) => {
        try {

            if (role === 'restaurant') {

                const payload = {
                    businessName: formData.businessName,
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    gender: formData.gender,
                }
                console.log(payload)
                const response = await axios.post(
                    "https://localhost:44319/api/User/register",
                    payload,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                return response.data;


            }



            else if (role === 'traveler') {

                try {
                    const payload = {

                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        phone: formData.phone,
                        // gender: formData.gender,
                    }

                    const response = await axios.post(
                        "http://localhost:4000/api/user/resgister",
                        payload,
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    );


                    return response.data;

                } catch (error) {
                    console.log(error.response.data.message);


                }


            }
            else if (role === 'delivery') {

                const payload = {
                    vehicleNumber: formData.vehicleNumber,
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    gender: formData.gender,
                }
                console.log(payload)
                const response = await axios.post(
                    "https://localhost:44319/api/User/register",
                    payload,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                return response.data;

            }
        }
        catch (error) {
            console.log(error);
        }


    }

    const onAuth = async (data, role) => {
        console.log(data, role)
        const response = await postUser(data, role);

    }

    const handleAuth = (userData, role) => {
        onAuth(userData, role);
    };

    const handleBack = () => {
        setAuthState('role-selection');
        setSelectedRole(null);
    };

    return (
        <>

            <Header />
            <div className="auth-flow-container">
                <div className="text-center mb-5">
                    <h1 className="role-selection-title">Join BusEats</h1>
                    <p className="role-selection-subtitle">Choose your role to get started</p>
                </div>


                {authState === 'role-selection' && (
                    <RoleSelection onRoleSelect={handleRoleSelect} />
                )}

                {authState === 'auth-form' && selectedRole && (
                    <AuthForm
                        authtype={"signup"}
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

export default SignupPage;