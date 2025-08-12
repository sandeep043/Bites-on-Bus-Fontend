import React, { useState } from 'react';
import { Card, Button, Form, Spinner } from 'react-bootstrap';
import { Shield, CheckCircle } from 'lucide-react';

export function OtpVerification({ isVerified, phoneNumber, onVerify }) {
    const [otp, setOtp] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

    const handleVerify = async () => {
        if (otp.length !== 6) {
            alert("Please enter a 6-digit OTP");
            return;
        }

        setIsVerifying(true);

        // Simulate OTP verification
        setTimeout(() => {
            if (otp === "123456") { // Mock valid OTP
                onVerify(otp);
                alert("Your phone number has been successfully verified.");
            } else {
                alert("Please check your OTP and try again.");
            }
            setIsVerifying(false);
        }, 1500);
    };

    const resendOtp = () => {
        alert(`New OTP sent to ${phoneNumber}`);
    };

    if (isVerified) {
        return (
            <Card className="p-4 shadow-sm border-success border-opacity-20 bg-success bg-opacity-10">
                <Card.Body>
                    <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center"
                            style={{ width: '40px', height: '40px' }}>
                            <CheckCircle className="text-success" style={{ width: '20px', height: '20px' }} />
                        </div>
                        <div>
                            <h3 className="h6 fw-semibold text-success mb-1">Phone Number Verified</h3>
                            <p className="small text-success text-opacity-80 mb-0">
                                Your phone number {phoneNumber} is verified
                            </p>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card className="p-4 shadow-sm border-warning border-opacity-20 bg-warning bg-opacity-10">
            <Card.Body>
                <div className="d-flex flex-column gap-3">
                    <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle bg-warning bg-opacity-10 d-flex align-items-center justify-content-center"
                            style={{ width: '40px', height: '40px' }}>
                            <Shield className="text-warning" style={{ width: '20px', height: '20px' }} />
                        </div>
                        <div>
                            <h3 className="h6 fw-semibold mb-1">Verify Phone Number</h3>
                            <p className="small text-muted mb-0">
                                Enter the OTP sent to {phoneNumber}
                            </p>
                        </div>
                    </div>

                    <div className="d-flex flex-column gap-3">
                        <Form.Group>
                            <Form.Label>6-Digit OTP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                maxLength={6}
                                className="text-center fs-5 letter-spacing-1"
                            />
                        </Form.Group>

                        <div className="d-flex gap-2">
                            <Button
                                onClick={handleVerify}
                                disabled={isVerifying || otp.length !== 6}
                                className="flex-grow-1"
                            >
                                {isVerifying ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" className="me-2" />
                                        Verifying...
                                    </>
                                ) : "Verify OTP"}
                            </Button>
                            <Button variant="outline-secondary" onClick={resendOtp}>
                                Resend
                            </Button>
                        </div>
                    </div>

                    <p className="small text-muted text-center mb-0">
                        Demo OTP: 123456 for testing purposes
                    </p>
                </div>
            </Card.Body>
        </Card>
    );
}