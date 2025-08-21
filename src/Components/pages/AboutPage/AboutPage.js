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
        <div className="about-page">
            <Header />

            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <div className="about-hero-content">
                        <div className="about-hero-icon-container">
                            <Bus className="about-hero-icon" />
                        </div>

                        <h1 className="about-hero-title">
                            <span className="hero-title-accent">About</span>  <span className="about-hero-title-accent">Bites on Bus</span>
                        </h1>

                        <p className="about-hero-text">
                            We're revolutionizing the way people eat during bus travel. Founded in 2024,
                            BusEats connects hungry travelers with quality restaurants at bus stops across India,
                            making every journey delicious and memorable.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="about-stats">
                <div className="container">
                    <div className="about-stats-grid">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="about-stat-item">
                                    <div className="about-stat-icon-container">
                                        <Icon className="about-stat-icon" />
                                    </div>
                                    <div className="about-stat-value">
                                        {stat.value}
                                    </div>
                                    <div className="about-stat-label">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="about-story">
                <div className="container">
                    <div className="about-story-content">
                        <div className="about-story-text">
                            <h2 className="about-section-title">Our Story</h2>
                            <div className="about-story-paragraphs">
                                <p className="about-section-text">
                                    It all started during a long bus journey from Delhi to Mumbai. Our founder,
                                    tired and hungry, was disappointed by the limited food options at bus stops.
                                    The idea sparked: what if quality restaurant food could be delivered directly
                                    to bus passengers?
                                </p>
                                <p className="about-section-text">
                                    Today, BusEats has grown into India's leading bus food delivery platform,
                                    serving thousands of travelers daily. We've partnered with local restaurants
                                    to bring fresh, hot meals to your bus seat, making travel more comfortable
                                    and enjoyable.
                                </p>
                                <p className="about-section-text">
                                    Our technology-driven approach ensures accurate delivery timing, real-time
                                    tracking, and seamless coordination between restaurants, delivery partners,
                                    and bus operators.
                                </p>
                            </div>
                        </div>

                        <div className="about-mission-cards">
                            <Card className="about-mission-card">
                                <Card.Body>
                                    <h3 className="about-card-title">Our Mission</h3>
                                    <p className="about-section-text">
                                        To make every bus journey comfortable by providing access to quality food,
                                        delivered with care and precision.
                                    </p>
                                </Card.Body>
                            </Card>

                            <Card className="about-vision-card">
                                <Card.Body>
                                    <h3 className="about-card-title">Our Vision</h3>
                                    <p className="about-section-text">
                                        To become the most trusted travel companion for bus passengers across India,
                                        creating a network of connected journeys and delicious experiences.
                                    </p>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="about-values">
                <div className="container">
                    <div className="about-values-header">
                        <h2 className="about-section-title">Our Values</h2>
                        <p className="about-section-text">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="about-values-grid">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <Card key={index} className="about-value-card">
                                    <Card.Body>
                                        <div className="about-value-icon-container">
                                            <Icon className="about-value-icon" />
                                        </div>
                                        <h3 className="about-value-title">{value.title}</h3>
                                        <p className="about-section-text">{value.description}</p>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="about-team">
                <div className="container">
                    <div className="about-team-header">
                        <h2 className="about-section-title">Leadership Team</h2>
                        <p className="about-section-text">Meet the people behind BusEats</p>
                    </div>

                    <div className="about-team-grid">
                        {[
                            {
                                name: "Sandeep Thalari",
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
                            <Card key={index} className="about-team-card">
                                <Card.Body>
                                    <div className="about-team-avatar">
                                        <Users className="about-team-icon" />
                                    </div>
                                    <h3 className="about-team-name">{member.name}</h3>
                                    <p className="about-team-role">{member.role}</p>
                                    <p className="about-team-bio">{member.bio}</p>
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