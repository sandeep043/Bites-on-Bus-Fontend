import React, { useState } from 'react';
import { Bus, Search, MapPin } from 'lucide-react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import { toast } from 'react-toastify';
import axios from 'axios';
import './OrderPage.css';

const OrderPage = () => {
    const navigate = useNavigate();
    const [pnr, setPnr] = useState('');
    const [pnrDetails, setPnrDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    //    navigate('/paymentPage', { state: { adults, flightDetails, airLineDetails } });
    //const { adults, flightDetails, airLineDetails } = location.state || {};

    const onPNRSubmit = async (pnr) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/pnr/${pnr}`);

            return response.data;


        } catch (error) {
            console.error("Error fetching PNR data:", error);
            alert("Failed to fetch PNR data. Please try again later.");
            setIsLoading(false);

        }




    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pnr.length > 5) {
            setIsLoading(true);
            setTimeout(async () => {

                const response = await onPNRSubmit(pnr);
                setIsLoading(false);
                if (response) {
                    setPnrDetails(response);
                    console.log("PNR Details:", pnrDetails);
                    toast.success("PNR details fetched successfully!");
                    // navigate('/paymentPage', { state: { adults, flightDetails, airLineDetails
                    navigate('/orderflow', { state: { pnr, response } });

                }

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
                                    onChange={(e) => setPnr(e.target.value)}
                                    className="pnr-input"
                                    maxLength={10}
                                />
                                <Search size={20} className="pnr-search-icon" />
                            </div>

                            <Button
                                type="submit"
                                variant="light"
                                size="lg"
                                disabled={!pnr || isLoading}
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