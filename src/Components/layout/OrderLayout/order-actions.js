import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Edit3, X, Headphones, MessageCircle } from 'lucide-react';

export function OrderActions({ order, onEditOrder, onCancelOrder }) {
    const canEdit = order.status === 'pending' || order.status === 'confirmed';
    const canCancel = order.status === 'pending' || order.status === 'confirmed';

    const handleContactSupport = () => {
        // Assuming you have a toast implementation compatible with Bootstrap
        // This would need to be replaced with your actual toast implementation
        alert("Our support team will contact you shortly.");
    };

    return (
        <Card className="p-4 shadow-sm">
            <Card.Body>
                <h2 className="h5 fw-semibold mb-4">Order Actions</h2>

                <div className="d-grid gap-2">
                    <Button
                        variant="outline-secondary"
                        onClick={onEditOrder}
                        disabled={!canEdit}
                        className="d-flex align-items-center justify-content-start"
                    >
                        <Edit3 className="me-2" style={{ width: '16px', height: '16px' }} />
                        Edit Order
                    </Button>


                    <Button
                        variant="outline-primary"
                        onClick={handleContactSupport}
                        className="d-flex align-items-center justify-content-start"
                    >
                        <Headphones className="me-2" style={{ width: '16px', height: '16px' }} />
                        Contact Support
                    </Button>

                    <Button
                        variant="outline-info"
                        className="d-flex align-items-center justify-content-start"
                    >
                        <MessageCircle className="me-2" style={{ width: '16px', height: '16px' }} />
                        Order Help
                    </Button>
                </div>

                {!canEdit && (
                    <p className="small text-muted mt-3 text-center mb-0">
                        Order modifications are not available once preparation begins
                    </p>
                )}
            </Card.Body>
        </Card>
    );
}