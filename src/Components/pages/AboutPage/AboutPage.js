import React from 'react';
import { Bus, Heart, Users, Award, Shield, Clock } from "lucide-react";
import Header from '../../layout/Header/Header'
import Footer from '../../layout/Footer/Footer';
import Card from 'react-bootstrap/Card';
import './AboutPage.css';

const AboutPage = () => {
    const stats = [
        { icon: Users, label: "Happy Travelers", value: "50,000+" },
        { icon: Bus, label: "Bus Routes Covered", value: "500+" },
        { icon: Award, label: "Partner Restaurants", value: "1,200+" },
        { icon: Clock, label: "Average Delivery Time", value: "15 min" }
    ];

    const values = [
        {
            icon: Heart,
            title: "Customer First",
            description: "Every decision we make puts our travelers' experience at the center."
        },
        {
            icon: Shield,
            title: "Quality & Safety",
            description: "We maintain the highest standards for food quality and hygiene."
        },
        {
            icon: Users,
            title: "Community",
            description: "Building connections between travelers, restaurants, and delivery partners."
        }
    ];

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center mb-6">
                            <div className="hero-icon-container">
                                <Bus className="hero-icon" />
                            </div>
                        </div>

                        <h1 className="hero-title">
                            About <span className="primary-text">BusEats</span>
                        </h1>

                        <p className="hero-text">
                            We're revolutionizing the way people eat during bus travel. Founded in 2024,
                            BusEats connects hungry travelers with quality restaurants at bus stops across India,
                            making every journey delicious and memorable.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="stat-icon-container">
                                        <Icon className="stat-icon" />
                                    </div>
                                    <div className="stat-value">
                                        {stat.value}
                                    </div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section">
                <div className="container px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="section-title">Our Story</h2>
                                <div className="space-y-4">
                                    <p className="section-text">
                                        It all started during a long bus journey from Delhi to Mumbai. Our founder,
                                        tired and hungry, was disappointed by the limited food options at bus stops.
                                        The idea sparked: what if quality restaurant food could be delivered directly
                                        to bus passengers?
                                    </p>
                                    <p className="section-text">
                                        Today, BusEats has grown into India's leading bus food delivery platform,
                                        serving thousands of travelers daily. We've partnered with local restaurants
                                        to bring fresh, hot meals to your bus seat, making travel more comfortable
                                        and enjoyable.
                                    </p>
                                    <p className="section-text">
                                        Our technology-driven approach ensures accurate delivery timing, real-time
                                        tracking, and seamless coordination between restaurants, delivery partners,
                                        and bus operators.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Card className="mission-card">
                                    <Card.Body>
                                        <h3 className="card-title">Our Mission</h3>
                                        <p className="section-text">
                                            To make every bus journey comfortable by providing access to quality food,
                                            delivered with care and precision.
                                        </p>
                                    </Card.Body>
                                </Card>

                                <Card className="vision-card">
                                    <Card.Body>
                                        <h3 className="card-title">Our Vision</h3>
                                        <p className="section-text">
                                            To become the most trusted travel companion for bus passengers across India,
                                            creating a network of connected journeys and delicious experiences.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <div className="container px-4">
                    <div className="text-center mb-12">
                        <h2 className="section-title">Our Values</h2>
                        <p className="section-text max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <Card key={index} className="value-card">
                                    <Card.Body>
                                        <div className="value-icon-container">
                                            <Icon className="value-icon" />
                                        </div>
                                        <h3 className="value-title">{value.title}</h3>
                                        <p className="section-text">{value.description}</p>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <div className="container px-4">
                    <div className="text-center mb-12">
                        <h2 className="section-title">Leadership Team</h2>
                        <p className="section-text">Meet the people behind BusEats</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                name: "Arjun Sharma",
                                role: "CEO & Founder",
                                bio: "Former tech executive with 10+ years in logistics and delivery platforms."
                            },
                            {
                                name: "Priya Patel",
                                role: "CTO",
                                bio: "Technology leader with expertise in real-time systems and mobile applications."
                            },
                            {
                                name: "Raj Gupta",
                                role: "Head of Operations",
                                bio: "Operations expert with deep knowledge of the Indian transportation ecosystem."
                            }
                        ].map((member, index) => (
                            <Card key={index} className="team-card">
                                <Card.Body>
                                    <div className="team-avatar">
                                        <Users className="team-icon" />
                                    </div>
                                    <h3 className="team-name">{member.name}</h3>
                                    <p className="team-role">{member.role}</p>
                                    <p className="team-bio">{member.bio}</p>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutPage;