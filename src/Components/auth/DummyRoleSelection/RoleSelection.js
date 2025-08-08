import React from 'react';
import { Bus, Utensils, Truck } from 'lucide-react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import './RoleSelection.css'

const RoleSelection = ({ onRoleSelect }) => {
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
                                <ul className="role-features">
                                    <li>Easy PNR-based ordering</li>
                                    <li>Food delivered to bus stops</li>
                                    <li>Real-time order tracking</li>
                                    <li>Multiple payment options</li>
                                </ul>
                                <Button
                                    onClick={() => onRoleSelect('traveler')}
                                    className="role-button bus-gradient"
                                >
                                    Continue as Traveler
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
                                <ul className="role-features">
                                    <li>Manage your menu online</li>
                                    <li>Track orders & analytics</li>
                                    <li>Expand customer reach</li>
                                    <li>Flexible partnerships</li>
                                </ul>
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
                                <ul className="role-features">
                                    <li>Flexible working hours</li>
                                    <li>Fair compensation</li>
                                    <li>GPS-guided delivery</li>
                                    <li>Performance bonuses</li>
                                </ul>
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
                        Already have an account?{' '}
                        <Button variant="link" className="role-login-link">
                            Sign in instead
                        </Button>
                    </p>
                </div>
            </Container>
        </div>
    );
};

export default RoleSelection;