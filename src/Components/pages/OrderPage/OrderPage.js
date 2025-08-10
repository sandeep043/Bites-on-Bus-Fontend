import React, { useState } from 'react';
import { Bus, Search, MapPin } from 'lucide-react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../layout/Header/Header';
import './OrderPage.css';

const OrderPage = ({ onPNRSubmit }) => {
    const [pnr, setPnr] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pnr.length === 10) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                onPNRSubmit(pnr);
            }, 1500);
        }
    };

    return (
        <>
            <Header />
            <div className="pnr-entry-container">
                <div className="pnr-content">
                    {/* Logo and Header */}
                    <div className="logo-container">
                        <div className="logo-icon">
                            <Bus size={40} color="white" />
                        </div>
                        <h1 className="logo-title">BusEats</h1>
                        <p className="logo-subtitle">Fresh meals delivered to your bus stop</p>
                    </div>

                    {/* PNR Input Form */}
                    <div className="pnr-card">
                        <div className="pnr-header">
                            <h2 className="pnr-title">Enter Your PNR</h2>
                            <p className="pnr-subtitle">
                                Enter the 10-digit PNR from your bus ticket
                            </p>
                        </div>

                        <Form onSubmit={handleSubmit}>
                            <div className="pnr-input-container">
                                <Form.Control
                                    type="text"
                                    placeholder="e.g., 1234567890"
                                    value={pnr}
                                    onChange={(e) => setPnr(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    className="pnr-input"
                                    maxLength={10}
                                />
                                <Search size={20} className="pnr-search-icon" />
                            </div>

                            <Button
                                type="submit"
                                variant="light"
                                size="lg"
                                disabled={pnr.length !== 10 || isLoading}
                                className="pnr-button"
                            >
                                {isLoading ? (
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="spinner"></div>
                                        <span>getting your journey...</span>
                                    </div>
                                ) : (
                                    <div className="d-flex align-items-center gap-2">
                                        <MapPin size={20} />
                                        <span>Find My Bus</span>
                                    </div>
                                )}
                            </Button>
                        </Form>

                        {/* Example PNR hint */}
                        <div className="pnr-hint">
                            <p>
                                Don't have a PNR? Try demo: <span className="font-monospace fw-medium">1234567890</span>
                            </p>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="features-grid">
                        <div>
                            <div className="feature-icon">🍽️</div>
                            <p className="feature-text">Fresh Food</p>
                        </div>
                        <div>
                            <div className="feature-icon">⚡</div>
                            <p className="feature-text">Quick Delivery</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderPage;