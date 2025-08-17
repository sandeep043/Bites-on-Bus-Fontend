import React from 'react';
import { Bus, Phone, Mail, MapPin, Clock } from "lucide-react";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="brand-logo-container">
                            <div className="brand-icon-wrapper">
                                <Bus className="brand-icon" />
                            </div>
                            <div>
                                <h1 className="brand-title">BusEats</h1>
                                <p className="brand-subtitle">Fresh food on the go</p>
                            </div>
                        </div>
                        <p className="brand-description">
                            Get fresh, delicious meals delivered right to your bus seat.
                            Making your journey more comfortable, one meal at a time.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h3 className="footer-section-title">Quick Links</h3>
                        <ul className="section-list">
                            <li><a href="/" className="section-link">Home</a></li>
                            <li><a href="/about" className="section-link">About Us</a></li>
                            <li><a href="/track-order" className="section-link">Track Order</a></li>
                            <li><a href="/help" className="section-link">Help & Support</a></li>
                        </ul>
                    </div>

                    {/* For Business */}
                    <div className="footer-section">
                        <h3 className="footer-section-title">For Business</h3>
                        <ul className="section-list">
                            <li><a href="/restaurant-partner" className="section-link">Partner with Us</a></li>
                            <li><a href="/delivery-agent" className="section-link">Become Delivery Agent</a></li>
                            <li><a href="/bus-operators" className="section-link">Bus Operators</a></li>
                            <li><a href="/business-help" className="section-link">Business Support</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-section">
                        <h3 className="footer-section-title">Contact Us</h3>
                        <div className="contact-info">
                            <div className="contact-item">
                                <Phone className="contact-icon" />
                                <span className="contact-text">+91 98765 43210</span>
                            </div>
                            <div className="contact-item">
                                <Mail className="contact-icon" />
                                <span className="contact-text">support@buseats.com</span>
                            </div>
                            <div className="contact-item">
                                <MapPin className="contact-icon" />
                                <span className="contact-text">Available across India</span>
                            </div>
                            <div className="contact-item">
                                <Clock className="contact-icon" />
                                <span className="contact-text">24/7 Customer Support</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright-text">
                        © 2024 BusEats. All rights reserved. | <a href="/privacy" className="footer-legal-link">Privacy Policy</a> | <a href="/terms" className="footer-legal-link">Terms of Service</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;