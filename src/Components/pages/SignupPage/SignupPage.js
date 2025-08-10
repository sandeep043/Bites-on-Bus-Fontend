import React, { useState } from 'react';
import { ArrowLeft, Bus, Utensils, Truck, Settings } from 'lucide-react';
import { Card, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import RoleSelection from '../../auth/RoleSelection/RoleSelection';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import './SignupPage.css';


const SignupPage = () => {
    const [authState, setAuthState] = useState('role-selection');
    const [selectedRole, setSelectedRole] = useState(null);
    const [authMode, setAuthMode] = useState('signup');
    const [formData, setFormData] = useState({});
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await postUser();
        if (response) {
            toast.success('Account created successfully!');
            navigate('/login');
        }



    };



    return (
        <>
            <Header />
            <ToastContainer />
            <div className="auth-flow-container">
                <div className="text-center mb-5">
                    <h1 className="role-selection-title">Join BusEats</h1>
                    <p className="role-selection-subtitle">Choose your role to get started</p>
                </div>



                <div className="auth-form-container">
                    <div className="auth-form-wrapper">


                        <Card className="auth-card">
                            <Card.Header className=" auth-card-header text-center pb-4 pt-4 ">
                                <div className={`icon-container bus-gradient`}>
                                    <Bus className="icon-lg text-white" />
                                </div>
                                <div><Card.Title className="auth-title">Traveler Account</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Create your account </Card.Subtitle></div>


                            </Card.Header>

                            <Card.Body>
                                <Form onSubmit={handleSubmit}>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
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


                                    <Button
                                        type="submit"
                                        className={`w-100 auth-submit-button bus-gradient`}
                                    >
                                        {authMode === 'login' ? 'Sign up' : 'Create Account'}
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

            </div>
            <Footer />
        </>
    );
};

export default SignupPage;