import React from 'react';
import { Bus, Utensils, Truck, Settings } from 'lucide-react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.css'

const RoleSelection = ({ onRoleSelect }) => {
    const navigate = useNavigate();
    return (
        <div className="role-selection-container">
            <Container className="role-selection-wrapper">

                <Row className="g-4">
                    {/* Traveler Card */}
                    <Col md={4}>
                        <Card className="role-card traveler-card">
                            <Card.Header className="text-center pb-3">
                                <div className="role-icon-container bus-gradient">
                                    <Bus className="role-icon" />
                                </div>
                                <Card.Title className="role-title">Traveler</Card.Title>
                            </Card.Header>
                            <Card.Body className="text-center">
                                <p className="role-description">
                                    Order delicious food during your bus journey using your PNR
                                </p>

                                <Button
                                    onClick={() => onRoleSelect('traveler')}
                                    className="role-button bus-gradient"
                                >
                                    Continue as Traveler
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Admin Card */}
                    <Col md={4}>
                        <Card className="role-card admin-card">
                            <Card.Header className="text-center pb-3">
                                <div className="role-icon-container bg-primary">
                                    <Settings className="role-icon" />
                                </div>
                                <Card.Title className="role-title">Admin</Card.Title>
                            </Card.Header>
                            <Card.Body className="text-center">
                                <p className="role-description">
                                    Manage the entire food delivery platform efficiently
                                </p>

                                <Button
                                    onClick={() => onRoleSelect('admin')}
                                    className="role-button bg-primary"
                                >
                                    Continue as Admin
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>



                    {/* Restaurant Owner Card */}
                    <Col md={4}>
                        <Card className="role-card restaurant-card">
                            <Card.Header className="text-center pb-3">
                                <div className="role-icon-container bg-secondary">
                                    <Utensils className="role-icon" />
                                </div>
                                <Card.Title className="role-title">Restaurant Owner</Card.Title>
                            </Card.Header>
                            <Card.Body className="text-center">
                                <p className="role-description">
                                    Partner with us to serve thousands of hungry travelers
                                </p>

                                <Button
                                    onClick={() => onRoleSelect('restaurant')}
                                    className="role-button bg-secondary"
                                >
                                    Continue as Restaurant
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Delivery Agent Card */}
                    <Col md={4}>
                        <Card className="role-card delivery-card">
                            <Card.Header className="text-center pb-3">
                                <div className="role-icon-container success-gradient">
                                    <Truck className="role-icon" />
                                </div>
                                <Card.Title className="role-title">Delivery Agent</Card.Title>
                            </Card.Header>
                            <Card.Body className="text-center">
                                <p className="role-description">
                                    Earn money by delivering food to bus stops in your area
                                </p>

                                <Button
                                    onClick={() => onRoleSelect('delivery')}
                                    className="role-button success-gradient"
                                >
                                    Continue as Delivery Agent
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <div className="text-center mt-5">
                    <p className="role-login-text">
                        dont have account  {' '}
                        <Button variant="link" onClick={() => navigate('/signup')} className="role-login-link">
                            Sign up instead
                        </Button>
                    </p>
                </div>
            </Container>
        </div>
    );
};

export default RoleSelection;