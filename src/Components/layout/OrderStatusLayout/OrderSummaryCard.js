import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Clock, MapPin, Hash } from 'lucide-react';

const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
        case 'delivered':
            return 'success';
        case 'preparing':
        case 'confirmed':
            return 'info';
        case 'on the way':
        case 'out for delivery':
            return 'warning';
        case 'placed':
        default:
            return 'secondary';
    }
};

const OrderSummaryCard = ({ order }) => {
    const formattedDate = new Date(order.orderTimeandDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const formattedTime = new Date(order.orderTimeandDate).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    return (
        <Card className="w-100 mb-4 shadow border-0"
            style={{
                background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)'
            }}>
            <Card.Header className="pb-2">
                <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1 me-3">
                        <div className="d-flex align-items-center small text-muted mb-1">
                            <Hash size={14} className="me-1" />
                            <span className="font-monospace">{order.PNR}</span>
                        </div>
                        <h3 className="h5 mb-0">
                            Order from {order.city}
                        </h3>
                    </div>
                    <Badge bg={getStatusVariant(order.status)} className="align-self-start">
                        {order.status}
                    </Badge>
                </div>
            </Card.Header>

            <Card.Body className="py-2">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center small text-muted">
                        <Clock size={16} className="me-2" />
                        <span>{formattedDate} · {formattedTime}</span>
                    </div>
                    <div className="h5 mb-0 fw-bold">
                        ₹{order.totalAmount}
                    </div>
                </div>

                <div className="d-flex align-items-center small text-muted">
                    <MapPin size={16} className="me-2" />
                    <span>{order.stop}</span>
                </div>
            </Card.Body>
        </Card>
    );
};

export default OrderSummaryCard;