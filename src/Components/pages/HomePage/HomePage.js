import React from 'react'
import Header from '../../layout/Header/Header'



import './HomePage.css'
import Footer from '../../layout/Footer/Footer';
import { Bus, Clock, Shield, Star, Utensils, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, Button, Form } from "react-bootstrap";



const HomePage = () => {
    const [pnr, setPnr] = useState("");
    const navigate = useNavigate();

    const handlePnrSubmit = () => {
        if (pnr.length >= 8) {
            navigate(`/order/${pnr}`);
        }
    };

    const features = [
        {
            icon: Clock,
            title: "Fresh & Fast",
            description: "Hot meals delivered to your bus seat within minutes"
        },
        {
            icon: Shield,
            title: "Safe & Secure",
            description: "Contactless delivery with hygiene protocols"
        },
        {
            icon: Star,
            title: "Quality Assured",
            description: "Partner restaurants with verified quality standards"
        },
        {
            icon: Utensils,
            title: "Variety",
            description: "Local cuisines and popular brands at every stop"
        }
    ];

    const testimonials = [
        {
            name: "Priya Sharma",
            route: "Delhi - Mumbai",
            rating: 5,
            comment: "Amazing service! Got fresh biryani delivered right to my seat. The tracking was so accurate!"
        },
        {
            name: "Raj Patel",
            route: "Bangalore - Chennai",
            rating: 5,
            comment: "Never thought I could get such good food during a bus journey. BusEats is a game changer!"
        },
        {
            name: "Anita Gupta",
            route: "Pune - Goa",
            rating: 4,
            comment: "Great variety of restaurants. The delivery was on time and food was hot. Loved it!"
        }
    ];
    return (
        <div className="home-page">
            <Header />
            <section className="hero-section">
                <div className="gradient-overlay"></div>
                <div className="container">
                    <div className="hero-content">
                        <div className="bus-icon-container">
                            <Card className="bus-icon-card">
                                <Bus className="bus-icon" />
                            </Card>
                        </div>

                        <h1 className="hero-title">
                            Fresh Food
                            <span className="hero-subtitle">On Your Journey</span>
                        </h1>

                        <p className="hero-description">
                            Get delicious meals delivered right to your bus seat. Enter your PNR and discover amazing restaurants at your next stop.
                        </p>

                        {/* PNR Input */}
                        <Card className="pnr-card">
                            <Card.Body>
                                <div className="pnr-content">
                                    <div className="text-center">
                                        <h3 className="pnr-title">Start Your Order</h3>
                                        <p className="pnr-subtitle">Enter your bus ticket PNR</p>
                                    </div>

                                    <div className="pnr-form">
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter 10-digit PNR (e.g., 1234567890)"
                                            value={pnr}
                                            onChange={(e) => setPnr(e.target.value.toUpperCase())}
                                            className="pnr-input"
                                            maxLength={10}
                                        />

                                        <Button
                                            onClick={handlePnrSubmit}
                                            disabled={pnr.length < 8}
                                            className="pnr-button"
                                        >
                                            Find Restaurants
                                        </Button>
                                    </div>

                                    <p className="pnr-help-text">
                                        Don't have a PNR? <Button variant="link" className="pnr-link">Book a bus ticket</Button>
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Why Choose BusEats?</h2>
                        <p className="section-description">
                            We make your bus journey delicious with our seamless food delivery service
                        </p>
                    </div>

                    <div className="features-grid">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Card key={index} className="feature-card">
                                    <Card.Body className="text-center">
                                        <div className="feature-icon-container">
                                            <Icon className="feature-icon" />
                                        </div>
                                        <Card.Title className="feature-title">{feature.title}</Card.Title>
                                        <Card.Text className="feature-description">{feature.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="how-it-works">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">How It Works</h2>
                        <p className="section-description">Simple steps to get your favorite food</p>
                    </div>

                    <div className="steps-container">
                        <div className="steps-grid">
                            {[
                                { step: "1", title: "Enter PNR", desc: "Enter your bus ticket PNR number" },
                                { step: "2", title: "Choose Food", desc: "Browse restaurants at your next stop" },
                                { step: "3", title: "Get Delivered", desc: "Fresh food delivered to your seat" }
                            ].map((item, index) => (
                                <div key={index} className="step-item">
                                    <div className="step-number">
                                        {item.step}
                                    </div>
                                    <h3 className="step-title">{item.title}</h3>
                                    <p className="step-description">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Happy Travelers</h2>
                        <p className="section-description">See what our customers say about us</p>
                    </div>

                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="testimonial-card">
                                <Card.Body>
                                    <div className="rating-container">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`star-icon ${i < testimonial.rating ? 'filled' : 'empty'}`}
                                            />
                                        ))}
                                    </div>
                                    <Card.Text className="testimonial-text">"{testimonial.comment}"</Card.Text>
                                    <div>
                                        <Card.Title className="testimonial-name">{testimonial.name}</Card.Title>
                                        <div className="testimonial-route">
                                            <MapPin className="route-icon" />
                                            {testimonial.route}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default HomePage;
