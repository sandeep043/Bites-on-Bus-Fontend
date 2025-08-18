import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, Home, ArrowLeft, Truck } from 'lucide-react';
import './StatusPage.css';

const StatusPage = () => {
    const { status, id, payment_id, order_id } = useParams();
    const navigate = useNavigate();

    const getStatusIcon = () => {
        switch (status.toLowerCase()) {
            case 'success':
                return <CheckCircle size={80} className="status-icon success-icon" />;
            case 'failed':
                return <XCircle size={80} className="status-icon failed-icon" />;
            default:
                return <Clock size={80} className="status-icon pending-icon" />;
        }
    };

    const getStatusColor = () => {
        switch (status.toLowerCase()) {
            case 'success':
                return 'text-green-600';
            case 'failed':
                return 'text-red-600';
            default:
                return 'text-yellow-600';
        }
    };

    return (
        <div className="status-container">
            <div className="status-card">
                <div className="status-header">
                    {getStatusIcon()}
                    <h1 className={`status-title ${getStatusColor()}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </h1>
                </div>

                <div className="status-details">
                    <div className="status-detail-item">
                        <span className="detail-label">Transaction ID:</span>
                        <span className="detail-value">{id}</span>
                    </div>
                    {payment_id && (
                        <div className="status-detail-item">
                            <span className="detail-label">Payment ID:</span>
                            <span className="detail-value">{payment_id}</span>
                        </div>
                    )}
                    {order_id && (
                        <div className="status-detail-item">
                            <span className="detail-label">Order ID:</span>
                            <span className="detail-value">{order_id}</span>
                        </div>
                    )}
                </div>

                <div className="status-actions">
                    <button
                        onClick={() => navigate(-1)}
                        className="status-button back-button"
                    >
                        <ArrowLeft size={20} className="button-icon" />
                        Back
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="status-button home-button"
                    >
                        <Home size={20} className="button-icon" />
                        Home
                    </button>
                    {status === 'success' && (
                        <button
                            onClick={() => navigate('/order-tracking', { state: { order_id } })}
                            className="status-button track-button"
                        >
                            <Truck size={20} className="button-icon" />
                            Track Order
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatusPage;