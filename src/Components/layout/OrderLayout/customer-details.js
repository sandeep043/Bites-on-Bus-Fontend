import React from 'react';
import { Card } from 'react-bootstrap';
import { User, Phone, Ticket, MapPin } from 'lucide-react';

export function CustomerDetailsCard({ customerDetails }) {
    return (
        <Card className="p-4 shadow-sm">
            <Card.Body>
                <h2 className="h5 fw-semibold mb-4">Passenger Details</h2>

                <div className="d-grid gap-3">
                    <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                            <User className="text-primary" style={{ width: '20px', height: '20px' }} />
                        </div>
                        <div>
                            <p className="text-muted small mb-0">Passenger Name</p>
                            <p className="fw-medium mb-0">{customerDetails.name}</p>
                        </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle bg-info bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                            <Phone className="text-info" style={{ width: '20px', height: '20px' }} />
                        </div>
                        <div>
                            <p className="text-muted small mb-0">Contact Number</p>
                            <p className="fw-medium mb-0">{customerDetails.phone}</p>
                        </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                            <Ticket className="text-success" style={{ width: '20px', height: '20px' }} />
                        </div>
                        <div>
                            <p className="text-muted small mb-0">PNR Number</p>
                            {/* <p className="fw-medium font-monospace mb-0">{customerDetails.PNR}</p> */}
                        </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle bg-warning bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                            <MapPin className="text-warning" style={{ width: '20px', height: '20px' }} />
                        </div>
                        <div>
                            <p className="text-muted small mb-0">Seat Number</p>
                            <p className="fw-medium mb-0">{customerDetails.seatNo}</p>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}