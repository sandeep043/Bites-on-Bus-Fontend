import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { User, MapPin, Armchair, Shield, Phone } from 'lucide-react';

const CustomerDeliveryDetails = ({
    customerDetails,
    stop,
    isOtpVerified,
    deliveryStatus,
    agentDetails = {} // Default to empty object if agentDetails not provided
}) => { 

    return (
        <Card className="w-100 mb-4 shadow-sm">
            <Card.Header>
                <Card.Title className="h5 mb-0">
                    Delivery Details
                </Card.Title>
            </Card.Header>

            <Card.Body className="py-3">
                <div className="d-flex align-items-center mb-3">
                    <User className="me-3 text-muted" size={20} />
                    <div>
                        <p className="mb-0 fw-medium">{customerDetails.name}</p>
                        <div className="d-flex align-items-center text-muted small">
                            <Phone className="me-1" size={14} />
                            <span>{customerDetails.phone}</span>
                        </div>
                    </div>
                </div>

                {customerDetails.seatNo && (
                    <div className="d-flex align-items-center mb-3">
                        <Armchair className="me-3 text-muted" size={20} />
                        <div>
                            <p className="mb-0 small text-muted">Seat No</p>
                            <p className="mb-0 fw-medium">{customerDetails.seatNo}</p>
                        </div>
                    </div>
                )}

                <div className="d-flex align-items-center mb-3">
                    <MapPin className="me-3 text-muted" size={20} />
                    <div>
                        <p className="mb-0 small text-muted">Delivery Stop</p>
                        <p className="mb-0 fw-medium">{stop}</p>
                    </div>
                </div>

                {/* <div className="d-flex align-items-center mb-3">
                    <Shield className="me-3 text-muted" size={20} />
                    <div className="d-flex align-items-center">
                        <span className="small text-muted me-2">OTP Verification:</span>
                        <Badge bg={isOtpVerified ? "success" : "danger"} className="text-white">
                            {isOtpVerified ? "✓ Verified" : "Pending"}
                        </Badge>
                    </div>
                </div> */}

               <div className="pt-2 border-top">
                    {(!agentDetails || Object.keys(agentDetails).length === 0) ? (
                        <p className="small text-muted mb-0">
                            <strong>Delivery Partner:</strong> Awaiting assignment
                        </p>
                    ) : (
                        <div>
                            <p className="small text-muted mb-0">
                                <strong>Delivery Partner:</strong> {agentDetails.name || 'N/A'}
                            </p>
                            {agentDetails.phone && (
                                <p className="small text-muted mb-0">
                                    <strong>Phone:</strong> {agentDetails.phone}
                                </p>
                            )}
                             <p className="small text-muted mb-0">
                                <strong>vehicleType :</strong> {agentDetails.vehicleType || 'N/A'}
                            </p>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default CustomerDeliveryDetails;