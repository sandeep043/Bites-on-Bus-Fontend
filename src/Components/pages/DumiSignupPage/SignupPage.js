import React, { useState } from 'react';
import { ArrowLeft, Bus, Utensils, Truck } from 'lucide-react';
import { Card, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import RoleSelection from '../../auth/DummyRoleSelection/RoleSelection';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import { useNavigate } from "react-router-dom";
import './SignupPage.css';


const SignupPage = () => {
    const [authState, setAuthState] = useState('role-selection');
    const [selectedRole, setSelectedRole] = useState(null);
    const [authMode, setAuthMode] = useState('signup');
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
            <div className="auth-flow-container">
                <div className="text-center mb-5">
                    <h1 className="role-selection-title">Join BusEats</h1>
                    <p className="role-selection-subtitle">Choose your role to get started</p>
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
                                        {'Create your account'}
                                    </p>
                                </Card.Header>

                                <Card.Body>
                                    <Form onSubmit={handleSubmit}>
                                        {authMode === 'signup' && (
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    {selectedRole === 'restaurant' ? 'Owner Name' : 'Full Name'}
                                                </Form.Label>
                                                <Form.Control
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="Enter your name"
                                                />
                                            </Form.Group>
                                        )}

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

                                        <Form.Group className="mb-3">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Enter your phone number"
                                            />
                                        </Form.Group>

                                        {selectedRole === 'restaurant' && (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Restaurant Name</Form.Label>
                                                <Form.Control
                                                    id="businessName"
                                                    name="businessName"
                                                    type="text"
                                                    value={formData.businessName}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="Enter restaurant name"
                                                />
                                            </Form.Group>
                                        )}

                                        {selectedRole === 'delivery' && (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Vehicle Number</Form.Label>
                                                <Form.Control
                                                    id="vehicleNumber"
                                                    name="vehicleNumber"
                                                    type="text"
                                                    value={formData.vehicleNumber}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="Enter vehicle number"
                                                />
                                            </Form.Group>
                                        )}


                                        <Button
                                            type="submit"
                                            className={`w-100 auth-submit-button ${config.color}`}
                                        >
                                            {authMode === 'login' ? 'Sign In' : 'Create Account'}
                                        </Button>

                                        <div className="text-center mt-3">
                                            <Button
                                                variant="link"
                                                onClick={() => navigate('/login')}
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