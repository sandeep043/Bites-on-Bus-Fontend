import React from 'react';
import { Badge } from 'react-bootstrap';
import { Clock, Train } from 'lucide-react';

export function OrderHeader({ order }) {
    const orderDate = new Date(order.orderTimeandDate);

    return (
        <div className="bg-primary p-4 rounded shadow-sm text-white">
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h1 className="h2 fw-bold mb-2">Order Summary</h1>
                    {/* <p className="text-white text-opacity-80 mb-0">Order ID: #{order._id.slice(-8).toUpperCase()}</p> */}
                </div>
                <StatusBadge status={order.status} className="bg-white text-dark border-white border-opacity-20" />
            </div>

            <div className="d-flex align-items-center gap-4 small text-white text-opacity-90">
                <div className="d-flex align-items-center gap-2">
                    <Clock style={{ width: '16px', height: '16px' }} />
                    <span>
                        {orderDate.toLocaleDateString()} at {orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <Train style={{ width: '16px', height: '16px' }} />
                    <span>Train Delivery Service</span>
                </div>
            </div>
        </div>
    );
}

// StatusBadge component (assuming this is a custom component)
function StatusBadge({ status, className }) {
    const statusColors = {
        pending: 'warning',
        confirmed: 'info',
        preparing: 'primary',
        out_for_delivery: 'success',
        delivered: 'success',
        cancelled: 'danger'
    };

    const statusText = {
        pending: 'Pending',
        confirmed: 'Confirmed',
        preparing: 'Preparing',
        out_for_delivery: 'Out for Delivery',
        delivered: 'Delivered',
        cancelled: 'Cancelled'
    };

    return (
        <Badge pill bg={statusColors[status]} className={`${className} px-3 py-2`}>
            {statusText[status]}
        </Badge>
    );
}