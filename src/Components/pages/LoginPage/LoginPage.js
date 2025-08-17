import React, { useState } from 'react';
import { Bus, Utensils, Truck, Settings, ArrowLeft } from 'lucide-react';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated, setToken } from '../../../redux/authSlice';
import './LoginPage.css';

const LoginPage = () => {
    const dispatch = useDispatch();
    const [authState, setAuthState] = useState('role-selection');
    const [selectedRole, setSelectedRole] = useState(null);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const roleConfig = {
        traveler: {
            icon: Bus,
            title: 'Traveler Account',
            gradient: 'traveler-gradient'
        },
        restaurant: {
            icon: Utensils,
            title: 'Restaurant Partner',
            gradient: 'restaurant-gradient'
        },
        delivery: {
            icon: Truck,
            title: 'Delivery Agent',
            gradient: 'delivery-gradient'
        },
        admin: {
            icon: Settings,
            title: 'Admin',
            gradient: 'admin-gradient'
        }
    };

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setAuthState('auth-form');
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

    const postUser = async (formData, role) => {
        try {
            let endpoint = '';
            const payload = {
                email: formData.email,
                password: formData.password,
            };

            switch (role) {
                case 'restaurant':
                    endpoint = '/api/owner/login';
                    break;
                case 'traveler':
                    endpoint = '/api/user/login';
                    break;
                case 'admin':
                    endpoint = '/api/admin/login';
                    break;
                case 'delivery':
                    endpoint = '/api/agent/login';
                    break;
                default:
                    throw new Error('Invalid role');
            }

            const response = await axios.post(
                `http://localhost:4000${endpoint}`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Login failed');
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postUser(formData, selectedRole);
            if (response) {
                localStorage.setItem(`${selectedRole}Data`, JSON.stringify(response.data));
                // dispatch(setIsAuthenticated(true));
                // dispatch(setToken(response.token));

                toast.success(`Login successful as ${selectedRole}`);

                const redirectPaths = {
                    'traveler': '/',
                    'restaurant': '/restaurant-dashboard',
                    'admin': '/admin-dashboard',
                    'delivery': '/delivery-dashboard'
                };
                setTimeout(() => {
                    navigate(redirectPaths[selectedRole], {
                        state: { role: selectedRole, response }
                    });
                }, 1000);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const config = roleConfig[selectedRole];
    const IconComponent = config?.icon;

    return (
        <>
            <Header />
            <ToastContainer />
            <div className="login-container">
                <div className="login-hero">
                    <div className="login-hero-content">
                        <h1 className="login-title">Welcome Back</h1>
                        <p className="login-subtitle">Login to your account to continue your journey</p>
                    </div>
                </div>

                {authState === 'role-selection' && (
                    <div className="role-selection-container">
                        <div className="role-grid">
                            {Object.entries(roleConfig).map(([role, { icon: Icon, title, gradient }]) => (
                                <div
                                    key={role}
                                    className={`role-card ${gradient}`}
                                    onClick={() => handleRoleSelect(role)}
                                >
                                    <div className="role-icon-container">
                                        <Icon className="role-icon" />
                                    </div>
                                    <h3 className="role-title">{title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {authState === 'auth-form' && selectedRole && (
                    <div className="login-form-container">
                        <Card className="login-card">
                            <Card.Header className="login-card-header">
                                <Button
                                    variant="link"
                                    onClick={handleBack}
                                    className="login-back-button"
                                >
                                    <ArrowLeft className="login-back-icon" />
                                    Back
                                </Button>
                                <div className="login-icon-container">
                                    <IconComponent className="login-icon" />
                                </div>
                                <Card.Title className="login-card-title">{config.title}</Card.Title>
                                <Card.Subtitle className="login-card-subtitle">
                                    Login to your {selectedRole} account
                                </Card.Subtitle>
                            </Card.Header>

                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="login-label">Email</Form.Label>
                                        <Form.Control
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your email"
                                            className="login-input"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="login-label">Password</Form.Label>
                                        <Form.Control
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your password"
                                            className="login-input"
                                        />
                                    </Form.Group>

                                    <Button
                                        type="submit"
                                        className="login-button"
                                    >
                                        Sign In
                                    </Button>

                                    <div className="login-signup-link">
                                        Don't have an account?{' '}
                                        <Button
                                            variant="link"
                                            onClick={() => navigate('/signup')}
                                            className="login-signup-button"
                                        >
                                            Sign up
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default LoginPage;