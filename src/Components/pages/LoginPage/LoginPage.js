import React, { useState } from "react";
import { Bus, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import Header from '../../layout/Header/Header'
import Footer from '../../layout/Footer/Footer';
import RoleSelection from "../../auth/RoleSelection";
import "./LoginPage.css";

const LoginPage = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (email && password && selectedRole) {
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

    return (
        <div className="min-h-screen">
            <Header />

            <div className="login-container">
                <Card className="login-card">
                    {/* Logo */}
                    <div className="logo-container">
                        <div className="flex items-center justify-center">
                            <div className="logo-icon-container">
                                <Bus className="logo-icon" />
                            </div>
                        </div>
                        <h1 className="login-title">Welcome Back</h1>
                        <p className="login-subtitle">Sign in to your account</p>
                    </div>

                    {/* Role Selection */}
                    {!selectedRole ? (
                        <RoleSelection
                            onRoleSelect={setSelectedRole}
                            selectedRole={selectedRole}
                        />
                    ) : (
                        <div className="form-space">
                            {/* Role Confirmation */}
                            <div className="role-confirmation">
                                <p className="role-text">
                                    Logging in as: <span className="font-semibold capitalize">{selectedRole}</span>
                                </p>
                                <Button
                                    variant="link"
                                    onClick={() => setSelectedRole(null)}
                                    className="change-role-btn"
                                >
                                    Change role
                                </Button>
                            </div>

                            {/* Login Form */}
                            <div className="mt-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <div className="password-input-container">
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <Button
                                            variant="link"
                                            className="password-toggle-btn"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="password-toggle-icon" />
                                            ) : (
                                                <Eye className="password-toggle-icon" />
                                            )}
                                        </Button>
                                    </div>
                                </Form.Group>

                                <div className="remember-forgot">
                                    <Form.Check
                                        type="checkbox"
                                        label="Remember me"
                                        className="remember-me"
                                    />
                                    <Button variant="link" className="forgot-password">
                                        Forgot password?
                                    </Button>
                                </div>

                                <Button
                                    onClick={handleLogin}
                                    disabled={!email || !password}
                                    className="w-100 bg-primary mt-3"
                                >
                                    Sign In
                                </Button>

                                <div className="signup-text">
                                    Don't have an account?{" "}
                                    <Button
                                        variant="link"
                                        onClick={() => navigate('/signup')}
                                        className="signup-link p-0"
                                    >
                                        Sign up
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
            </div>

            <Footer />
        </div>
    );
};

export default LoginPage;