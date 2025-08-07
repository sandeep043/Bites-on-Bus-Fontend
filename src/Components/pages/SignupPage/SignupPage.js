import React, { useState } from "react";
import { Card, Button, Form, InputGroup } from "react-bootstrap";
import { Bus, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from '../../layout/Header/Header'
import Footer from '../../layout/Footer/Footer';
import RoleSelection from "../../auth/RoleSelection";

import "./SignupPage.css";

const SignupPage = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();

    const handleSignup = () => {
        if (formData.email && formData.password && selectedRole && formData.password === formData.confirmPassword) {
            switch (selectedRole) {
                case 'traveler':
                    navigate('/');
                    break;
                case 'restaurant':
                    navigate('/restaurant-dashboard');
                    break;
                case 'delivery':
                    navigate('/delivery-dashboard');
                    break;
                case 'admin':
                    navigate('/admin-dashboard');
                    break;
                default:
                    navigate('/');
            }
        }
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="signup-container">
            <Header />

            <div className="signup-content">
                <Card className="w-full max-w-md p-4">
                    <Card.Body className="p-4">
                        {/* Logo */}
                        <div className="text-center">
                            <div className="logo-container">
                                <div className="logo-icon">
                                    <Bus />
                                </div>
                            </div>
                            <h1 className="signup-title">Create Account</h1>
                            <p className="signup-subtitle">Join BusEats today</p>
                        </div>

                        {/* Role Selection */}
                        {!selectedRole ? (
                            <RoleSelection
                                onRoleSelect={setSelectedRole}
                                selectedRole={selectedRole}
                            />
                        ) : (
                            <div className="mt-4">
                                {/* Role Confirmation */}
                                <div className="role-confirmation">
                                    <p className="role-text">
                                        Creating account as: <span className="fw-semibold text-capitalize">{selectedRole}</span>
                                    </p>
                                    <Button
                                        variant="link"
                                        onClick={() => setSelectedRole(null)}
                                        className="role-change p-0"
                                    >
                                        Change role
                                    </Button>
                                </div>

                                {/* Signup Form */}
                                <Form className="mt-4">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={formData.fullName}
                                            onChange={(e) => updateFormData('fullName', e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={(e) => updateFormData('email', e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            placeholder="Enter your phone number"
                                            value={formData.phone}
                                            onChange={(e) => updateFormData('phone', e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Create a password"
                                                value={formData.password}
                                                onChange={(e) => updateFormData('password', e.target.value)}
                                            />
                                            <InputGroup.Text className="password-toggle">
                                                <Button
                                                    variant="link"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="p-0"
                                                >
                                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </Button>
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3 d-flex align-items-start">
                                        <Form.Check
                                            type="checkbox"
                                            id="terms"
                                            className="me-2 mt-1"
                                        />
                                        <Form.Label htmlFor="terms" className="terms-text">
                                            I agree to the{" "}
                                            <Button variant="link" className="terms-link p-0">Terms of Service</Button>
                                            {" "}and{" "}
                                            <Button variant="link" className="terms-link p-0">Privacy Policy</Button>
                                        </Form.Label>
                                    </Form.Group>

                                    <Button
                                        onClick={handleSignup}
                                        disabled={!formData.email || !formData.password || formData.password !== formData.confirmPassword}
                                        variant="primary"
                                        className="w-100"
                                    >
                                        Create Account
                                    </Button>
                                </Form>

                                <div className="text-center mt-3">
                                    <p className="login-link">
                                        Already have an account?{" "}
                                        <Button
                                            variant="link"
                                            onClick={() => navigate('/login')}
                                            className="login-link p-0"
                                        >
                                            Sign in
                                        </Button>
                                    </p>
                                </div>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </div>

            <Footer />
        </div>
    );
};

export default SignupPage;