import React from 'react';
import { Button } from 'react-bootstrap';
import { Phone, X, HelpCircle } from 'lucide-react';

const ActionButtons = ({
    status,
    onContactRestaurant,
    onCancelOrder,
    onGetHelp
}) => {
    const canCancel = ['placed', 'confirmed'].includes(status.toLowerCase());

    return (
        <div className="w-100 mb-3">
            <div className="d-grid gap-2 d-sm-flex">
                <Button
                    variant="outline-primary"
                    className="w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                    onClick={onContactRestaurant}
                >
                    <Phone size={16} />
                    Contact Restaurant
                </Button>

                {canCancel && (
                    <Button
                        variant="outline-danger"
                        className="w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                        onClick={onCancelOrder}
                    >
                        <X size={16} />
                        Cancel Order
                    </Button>
                )}
            </div>

            <Button
                variant="outline-secondary"
                className="w-100 d-flex align-items-center justify-content-center gap-2 mt-3 py-2"
                onClick={onGetHelp}
            >
                <HelpCircle size={16} />
                Need Help?
            </Button>
        </div>
    );
};

export default ActionButtons;