import React, { useState } from 'react';
import { Bus, Eye, EyeOff } from 'lucide-react';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import './SignupPage.css';

const SignupPage = () => {
    const [formData, setFormData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const postUser = async () => {
        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
            }

            const response = await axios.post(
                "http://localhost:4000/api/user/register",
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.log(error.response);
            toast.error(`Error: ${error.response.data.message}`);
        }
    }

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // const handleFormInput = (e) => {
    //     if (e.target.name === '') {
    //         // Handle empty name case if needed  
    //         toast.error('Name cannot be empty');
    //     }
    //     if (e.target.email === 'email' && !/\S+@\S+\.\S+/.test(e.target.value)) {
    //         toast.error('Please enter a valid email address');
    //     }
    //     if (e.target.password.length < 8) {
    //         toast.error('Password must be at least 8 characters long');
    //     }
    //     if (e.target.name === 'phone' && !/^\d{10}$/.test(e.target.value)) {
    //         toast.error('Please enter a valid phone number');
    //     }
    // }

    const formValidation = () => {
        if (!formData.name || !formData.email || !formData.password || !formData.phone) {
            toast.error('All fields are required');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return false;
        }
        if (formData.password.length < 8) {
            toast.error('Password must be at least 8 characters long');
            return false;
        }
        if (!/^\d{10}$/.test(formData.phone)) {
            toast.error('Please enter a valid phone number');
            return false;
        }
        return true;
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formValidation()) {
            return; // Stop submission if validation fails
        }
        const response = await postUser();
        if (response) {
            toast.success('Account created successfully!');
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirect after 2 seconds

        }
    };

    return (
        <>
            <Header />
            <ToastContainer />
            <div className="signup-container">
                <div className="signup-hero">
                    <div className="signup-hero-content">
                        <h1 className="signup-title">Join BusEats</h1>
                        <p className="signup-subtitle">Create your traveler account to enjoy fresh meals on your journey</p>
                    </div>
                </div>

                <div className="signup-form-container">
                    <Card className="signup-card">
                        <Card.Header className="signup-card-header">
                            <div className="signup-icon-container">
                                <Bus className="signup-icon" />
                            </div>
                            <Card.Title className="signup-card-title">Traveler Sign Up</Card.Title>
                            <Card.Subtitle className="signup-card-subtitle">Fill in your details to get started</Card.Subtitle>
                        </Card.Header>

                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="signup-label">Full Name</Form.Label>
                                    <Form.Control
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                        className="signup-input"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="signup-label">Email Address</Form.Label>
                                    <Form.Control
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        className="signup-input"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" style={{ position: 'relative' }}>
                                    <Form.Label className="signup-label">Password</Form.Label>
                                    <Form.Control
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Create a password"
                                        className="signup-input"
                                    />
                                    <span
                                        style={{
                                            position: 'absolute',
                                            right: '16px',
                                            top: '38px',
                                            cursor: 'pointer',
                                            zIndex: 2
                                        }}
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </span>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="signup-label">Phone Number</Form.Label>
                                    <Form.Control
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Enter your phone number"
                                        className="signup-input"
                                    />
                                </Form.Group>

                                <button
                                    type="submit"
                                    className="btn signup-button"
                                >
                                    Create Account
                                </button>

                                <div className="signup-login-link">
                                    Already have an account?{' '}
                                    <Button
                                        variant="link"
                                        onClick={() => navigate('/login')}
                                        className="signup-login-button"
                                    >
                                        Sign in
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SignupPage;