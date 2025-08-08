import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Card, Button, Form, InputGroup } from "react-bootstrap";
import { Bus, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from '../../layout/Header/Header'
import Footer from '../../layout/Footer/Footer';
import RoleSelection from "../../auth/RoleSelection";
import { Input, Select, DatePicker, Radio } from 'antd';
import dayjs from 'dayjs';
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    PhoneOutlined,
    GlobalOutlined
} from '@ant-design/icons';

import "./SignupPage.css";

const SignupPage = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        gender: '',
        dateOfBirth: '',
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

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
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    const handleDateChange = (date, dateString) => {
        setFormData(prev => ({ ...prev, dateOfBirth: dateString }));
        if (errors.dateOfBirth) {
            setErrors(prev => ({ ...prev, dateOfBirth: '' }));
        }
    };
    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
        if (!formData.userName.trim()) newErrors.userName = 'User Name is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        else if (
            !formData.password.match(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            )
        ) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number.';
        }
        if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const notify = () => toast.success('User Created Successfully');
    const handleSubmit = async (e) => {
        e.preventDefault();
        // await fetchUsers();
        // console.log(users);

        // if (users && users.some(user => user.userName === formData.userName)) {
        //     toast.error('User name already exists. Please choose a different one.');
        //     setErrors(prev => ({
        //         ...prev,
        //         userName: 'User name already exists. Please choose a different one.',
        //     }));

        //     return;
        // }
        // if (users && users.some(user => user.email === formData.email)) {
        //     toast.error('Email already exists. Please choose a different one.');
        //     setErrors(prev => ({
        //         ...prev,
        //         email: 'Email already exists. Please choose a different one.',
        //     }));
        //     return;
        // }
        if (validateForm()) {
            // await postUser();
            notify(); // Show a notification
            setFormData({
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                country: '',
                phone: '',
                password: '',
                confirmPassword: '',
                gender: '',
                dateOfBirth: '',
            }); // Reset the form
            setErrors({});
            // await fetchUsers();  // Reset errors
        }
    };


    // const updateFormData = (field, value) => {
    //     setFormData(prev => ({ ...prev, [field]: value }));
    // };

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
                                <form onSubmit={handleSubmit} className='signup-form'>
                                    <div className='form-group'>
                                        <div className='form-group-inline'>
                                            <div>
                                                <label>Full Name*</label>
                                                <Input
                                                    name='firstName'
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    prefix={<UserOutlined />}
                                                    placeholder='Enter your first name'
                                                    status={errors.firstName && 'error'}
                                                />
                                                {errors.firstName && <span className='error-message'>{errors.firstName}</span>}
                                            </div>

                                        </div>
                                    </div>


                                    <div className='form-group'>
                                        <label>Email Address*</label>
                                        <Input
                                            name='email'
                                            value={formData.email}
                                            onChange={handleChange}
                                            prefix={<MailOutlined />}
                                            placeholder='example@domain.com'
                                            status={errors.email && 'error'}
                                        />
                                        {errors.email && <span className='error-message'>{errors.email}</span>}
                                    </div>



                                    <div className='form-group'>
                                        <div className='form-group-inline'>

                                            <div>
                                                <label>Phone Number*</label>
                                                <Input
                                                    name='phone'
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    prefix={<PhoneOutlined />}
                                                    placeholder='1234567890'
                                                    status={errors.phone && 'error'}
                                                />
                                                {errors.phone && <span className='error-message'>{errors.phone}</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <label>Password*</label>
                                        <Input.Password
                                            name='password'
                                            value={formData.password}
                                            onChange={handleChange}
                                            prefix={<LockOutlined />}
                                            placeholder='Enter password'
                                            status={errors.password && 'error'}
                                        />
                                        {errors.password && <span className='error-message'>{errors.password}</span>}
                                        <small className='password-hint'>Minimum 8 characters</small>
                                    </div>

                                    <div className='form-group'>
                                        <label>Confirm Password*</label>
                                        <Input.Password
                                            name='confirmPassword'
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            prefix={<LockOutlined />}
                                            placeholder='Re-enter password'
                                            status={errors.confirmPassword && 'error'}
                                        />
                                        {errors.confirmPassword && <span className='error-message'>{errors.confirmPassword}</span>}
                                    </div>

                                    <div className='form-group'>
                                        <label>Gender*</label>
                                        <Radio.Group
                                            className='genderStyle'
                                            name='gender'
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >
                                            <Radio value='male'>Male</Radio>
                                            <Radio value='female'>Female</Radio>
                                            <Radio value='other'>Other</Radio>

                                        </Radio.Group>
                                        {errors.gender && <span className='error-message'>{errors.gender}</span>}
                                    </div>

                                    <div className='form-group'>
                                        <label>Date of Birth*</label>
                                        <DatePicker
                                            value={formData.dateOfBirth ? dayjs(formData.dateOfBirth) : null}
                                            onChange={handleDateChange}
                                            style={{ width: '100%' }}
                                            placeholder='Select your birth date'
                                            status={errors.dateOfBirth && 'error'}
                                        />
                                        {errors.dateOfBirth && <span className='error-message'>{errors.dateOfBirth}</span>}
                                    </div>

                                    <button type='submit' className='btn btn-primary btn-lg btn-block mt-4'>
                                        Sign Up
                                    </button>
                                </form>

                                {/* <Form className="mt-4">
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
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create a password"
                                            value={formData.password}
                                            onChange={(e) => updateFormData('password', e.target.value)}
                                        />
                                        <InputGroup>

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
                                </Form> */}

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