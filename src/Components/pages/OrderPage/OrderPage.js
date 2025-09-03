import React, { useState } from 'react';
import { Bus, Search, MapPin, Clock, Shield, Utensils } from 'lucide-react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './OrderPage.css';

const OrderPage = () => {
    const navigate = useNavigate();
    const [pnr, setPnr] = useState('');
    const [pnrDetails, setPnrDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onPNRSubmit = async (pnr) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/pnr/${pnr}`);
            return response.data;
        } catch (error) {
            toast.error(`Error fetching PNR data: ${error.response?.data?.message} `, error.response?.data?.message);

            console.error("Error fetching PNR data:", error);

            setIsLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pnr.length > 5) {
            setIsLoading(true);
            setTimeout(async () => {
                const PNRresponse = await onPNRSubmit(pnr);
                setIsLoading(false);
                if (PNRresponse) {
                    setPnrDetails(PNRresponse);
                    toast.success("PNR details fetched successfully!");
                    navigate('/orderflow', { state: { pnr, PNRresponse } });
                }
            }, 1500);
        }
    };

    return (
        <>
            <Header />
            <ToastContainer />
            <div className="order-page-container">
                <div className="order-page-content">
                    {/* Logo and Header */}
                    <div className="order-logo-container">
                        <div className="order-logo-icon">
                            <Bus size={40} className="order-logo-bus" />
                        </div>
                        <h1 className="order-logo-title">BusEats</h1>
                        <p className="order-logo-subtitle">Fresh meals delivered to your bus seat</p>
                    </div>

                    {/* PNR Input Form */}
                    <div className="order-pnr-card">
                        <div className="order-pnr-header">
                            <h2 className="order-pnr-title">Enter Your PNR</h2>
                            <p className="order-pnr-subtitle">
                                Enter the 10-digit PNR from your bus ticket
                            </p>
                        </div>

                        <Form onSubmit={handleSubmit}>
                            <div className="order-pnr-input-container">
                                <Form.Control
                                    type="text"
                                    placeholder="e.g., 1234567890"
                                    value={pnr}
                                    onChange={(e) => setPnr(e.target.value)}
                                    className="order-pnr-input"
                                    maxLength={10}
                                />
                                <Search size={20} className="order-pnr-search-icon" />
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                disabled={!pnr || isLoading}
                                className="order-pnr-button"
                            >
                                {isLoading ? (
                                    <div className="order-loading-container">
                                        <div className="order-spinner"></div>
                                        <span>Finding your journey...</span>
                                    </div>
                                ) : (
                                    <div className="order-button-content">
                                        <MapPin size={20} />
                                        <span>Find My Bus</span>
                                    </div>
                                )}
                            </Button>
                        </Form>

                        {/* Example PNR hint */}
                        <div className="order-pnr-hint">
                            <p>
                                Don't have a PNR? Try demo: <span className="order-demo-pnr">PNR1001</span>
                            </p>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="order-features-grid">
                        <div className="order-feature-item">
                            <div className="order-feature-icon">
                                <Utensils size={24} />
                            </div>
                            <p className="order-feature-text">Fresh Food</p>
                        </div>
                        <div className="order-feature-item">
                            <div className="order-feature-icon">
                                <Clock size={24} />
                            </div>
                            <p className="order-feature-text">Quick Delivery</p>
                        </div>
                        <div className="order-feature-item">
                            <div className="order-feature-icon">
                                <Shield size={24} />
                            </div>
                            <p className="order-feature-text">Safe & Hygienic</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default OrderPage;