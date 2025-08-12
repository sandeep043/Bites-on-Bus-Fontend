import React from 'react';
import { Card } from 'react-bootstrap';
import { MapPin, Clock } from 'lucide-react';

export function DeliveryInfo({ deliveryLocation, estimatedTime }) {
    return (
        <Card className="p-4 shadow-sm">
            <Card.Body>
                <h2 className="h5 fw-semibold mb-4">Delivery Information</h2>

                <div className="d-flex flex-column gap-3">
                    <div className="d-flex align-items-start gap-3">
                        <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mt-1"
                            style={{ width: '40px', height: '40px' }}>
                            <MapPin className="text-primary" style={{ width: '20px', height: '20px' }} />
                        </div>
                        <div className="flex-grow-1">
                            <p className="text-muted small mb-1">Delivery Stop</p>
                            <p className="fw-semibold h6 mb-1">{deliveryLocation.stop}</p>
                            <p className="text-muted">{deliveryLocation.city}</p>
                        </div>
                    </div>

                    {estimatedTime && (
                        <div className="d-flex align-items-center gap-3 p-3 bg-info bg-opacity-10 rounded border border-info border-opacity-25">
                            <Clock className="text-info" style={{ width: '20px', height: '20px' }} />
                            <div>
                                <p className="small fw-medium text-info">Estimated Delivery</p>
                                <p className="small text-info text-opacity-80">{estimatedTime}</p>
                            </div>
                        </div>
                    )}

                    <div className="small text-muted p-3 bg-light rounded">
                        <p className="mb-1">📱 <strong>Delivery Instructions:</strong></p>
                        <p className="mb-0">Our delivery partner will call you 10-15 minutes before reaching your station. Please be ready at the platform.</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}