import React, { useState } from 'react';
import { ArrowLeft, Bus, Utensils, Truck } from 'lucide-react';
import { Card, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import './AuthForm.css'

const AuthForm = ({ role, onBack, onAuth, authtype }) => {
    const [authMode, setAuthMode] = useState(authtype);
    const [formData, setFormData] = useState({});

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

    const config = roleConfig[role];
    const IconComponent = config.icon;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAuth(formData, role);
    };

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="auth-form-container">
            <div className="auth-form-wrapper">
                <Button
                    variant="link"
                    onClick={onBack}
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
                            {authMode === 'login' ? 'Sign in to your account' : 'Create your account'}
                        </p>
                    </Card.Header>

                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            {authMode === 'signup' && (
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        {role === 'restaurant' ? 'Owner Name' : 'Full Name'}
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

                            {authMode === 'signup' && (
                                <>
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

                                    {role === 'restaurant' && (
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

                                    {role === 'delivery' && (
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
                                </>
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
                                    onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
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
    );
};

export default AuthForm;