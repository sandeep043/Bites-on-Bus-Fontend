import React, { useState } from 'react';
import { ArrowLeft, Bus, Utensils, Truck, Settings } from 'lucide-react';
import { Card, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import RoleSelection from '../../auth/RoleSelection/RoleSelection';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import './LoginPage.css';


const SignupPage = () => {
    const [authState, setAuthState] = useState('role-selection');
    const [selectedRole, setSelectedRole] = useState(null);
    const [authMode, setAuthMode] = useState('login');
    const [formData, setFormData] = useState({});

    const navigate = useNavigate();

    const roleConfig = {
        traveler: {
            icon: Bus,
            title: 'Traveler Account',
            color: 'bus-gradient'
        },
        restaurant: {
            icon: Utensils,
            title: 'Restaurant Partner',
            color: 'bg-secondary'
        },
        delivery: {
            icon: Truck,
            title: 'Delivery Agent',
            color: 'success-gradient'
        },
        admin: {
            icon: Settings,
            title: 'Admin ',
            color: 'success-gradient'
        }
    };

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setAuthState('auth-form');
    };

    const postUser = async (formData, role) => {
        try {
            if (role === 'restaurant') {
                const payload = {
                    email: formData.email,
                    password: formData.password,
                }
                console.log(payload)
                const response = await axios.post(
                    "http://localhost:4000/api/owner/login",
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

                        email: formData.email,
                        password: formData.password,

                    }

                    const response = await axios.post(
                        "http://localhost:4000/api/user/login",
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
            } else if (role === 'admin') {
                try {
                    const payload = {

                        email: formData.email,
                        password: formData.password,

                    }

                    const response = await axios.post(
                        "http://localhost:4000/api/admin/login",
                        payload,
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                    return response;
                } catch (error) {
                    console.log(error.response.data.message);
                    toast.error(`Error: ${error.response.data.message}`);
                }
            }
            else if (role === 'delivery') {
                const payload = {
                    email: formData.email,
                    password: formData.password,
                }
                console.log(payload)
                const response = await axios.post(
                    "http://localhost:4000/api/agent/login",
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
        if (response) {
            localStorage.setItem(`${role}Data`, JSON.stringify(response.data));

            console.log(`${role}Data`);
            toast.success(`Login successful! as ${role}`);
            if (role === 'traveler') {
                navigate('/');
            }
            else if (role === 'restaurant') {
                // navigate('/restaurant-dashboard');
                navigate('/restaurant-dashboard', { state: { role, response } });
            }
            else if (role === 'admin') {
                navigate('/admin-dashboard');
            }
            else if (role === 'delivery') {
                navigate('/delivery-dashboard', { state: { role, response } });
            }
        }




    }

    const handleAuth = (userData, role) => {
        onAuth(userData, role);
    };

    const handleBack = () => {
        setAuthState('role-selection');
        setSelectedRole(null);
    };

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAuth(formData, selectedRole);
    };

    const config = roleConfig[selectedRole];
    const IconComponent = config?.icon;

    return (
        <>
            <Header />
            <ToastContainer />
            <div className="auth-flow-container">
                <div className="text-center mb-5">
                    <h1 className="role-selection-title">Welcome Back</h1>
                    <p className="role-selection-subtitle">Choose your role to login</p>
                </div>

                {authState === 'role-selection' && (
                    <RoleSelection onRoleSelect={handleRoleSelect} />
                )}

                {authState === 'auth-form' && selectedRole && (
                    <div className="auth-form-container">
                        <div className="auth-form-wrapper">
                            <Button
                                variant="link"
                                onClick={handleBack}
                                className="auth-back-button"
                            >
                                <ArrowLeft className="icon mr-2" />
                                Back to role selection
                            </Button>

                            <Card className="auth-card">
                                <Card.Header className="text-center pb-4">
                                    <div className={`icon-container ${config.color}`}>
                                        <IconComponent className="icon-lg text-white" />
                                    </div>
                                    <Card.Title className="auth-title">{config.title}</Card.Title>
                                    <p className="auth-subtitle">
                                        {'login to your '}
                                    </p>
                                </Card.Header>

                                <Card.Body>
                                    <Form onSubmit={handleSubmit}>


                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter your email"
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter your password"
                                            />
                                        </Form.Group>



                                        <Button
                                            type="submit"
                                            className={`w-100 auth-submit-button ${config.color}`}
                                        >
                                            {authMode === 'login' ? 'Sign In' : 'Create Account'}
                                        </Button>

                                        <div className="text-center mt-3">
                                            <Button
                                                variant="link"
                                                onClick={() => navigate('/signup')}
                                                className="auth-toggle-mode"
                                            >
                                                {authMode === 'login'
                                                    ? "Don't have an account? Sign up"
                                                    : 'Already have an account? Sign in'}
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default SignupPage;