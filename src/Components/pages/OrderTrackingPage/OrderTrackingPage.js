import React, { useEffect, useState } from 'react';
import { Container, Toast } from 'react-bootstrap';
import OrderSummaryCard from "../../layout/OrderStatusLayout/OrderSummaryCard";
import DeliveryProgressTracker from "../../layout/OrderStatusLayout/DeliveryProgressTracker";
import CustomerDeliveryDetails from "../../layout/OrderStatusLayout/CustomerDeliveryDetails";
import OrderItemsList from "../../layout/OrderStatusLayout/OrderItemsList";
import ActionButtons from "../../layout/OrderStatusLayout/ActionButtons";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import { Truck, Clock, MapPin, User, Phone } from 'lucide-react';
import './OrderTrackingPage.css';

// const sampleOrder = {
//     "_id": "689c7eb6349646d817c5fc38",
//     "userId": "689ad3f27ac9109206dfc07f",
//     "restaurantId": "6899f35c93d4c9555fe503e0",
//     "PNR": "6898fa79be61e37e43611f61",
//     "stop": "North Stop",
//     "city": "City B",
//     "orderTimeandDate": "2024-11-30T14:30:00.000Z",
//     "customerDetails": {
//         "name": "sandeep",
//         "phone": "111111111111111",
//         "seatNo": "asdf"
//     },
//     "Orderitems": [
//         {
//             "name": "bajji",
//             "price": 100,
//             "prepTime": 10,
//             "dietaryTags": ["snack"],
//             "isAvailable": true,
//             "_id": "689a02dc824e64a58d139a1f",
//             "quantity": 1
//         },
//         {
//             "name": "mirapkaya bajji",
//             "price": 200,
//             "prepTime": 5,
//             "dietaryTags": ["hot", "snack"],
//             "isAvailable": false,
//             "_id": "689a040d824e64a58d139a3e",
//             "quantity": 1
//         },
//         {
//             "name": "egg bajji",
//             "price": 60,
//             "prepTime": 20,
//             "dietaryTags": ["non-veg"],
//             "isAvailable": true,
//             "_id": "689acbac7ac9109206dfbe5d",
//             "quantity": 1
//         }
//     ],
//     "totalAmount": 360,
//     "status": "Placed",
//     "paymentId": "689c7eac349646d817c5fc34",
//     "isOtpVerified": false,
//     "deliveryStatus": "pending",
//     "createdAt": "2025-08-13T12:01:58.912Z"
// };

const OrderTrackingPage = () => {
    const location = useLocation();


    const { order_id } = location.state || {};
    const [order, setOrder] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastConfig, setToastConfig] = useState({
        title: '',
        message: '',
        variant: 'success'
    });
    const [isLoading, setIsLoading] = useState(true);

    console.log("Order ID from state:", order_id);

    const showNotification = (title, message, variant = 'success') => {
        setToastConfig({ title, message, variant });
        setShowToast(true);
    };

    const handleContactRestaurant = () => {
        showNotification(
            "Contacting Restaurant",
            "Opening phone dialer...",
            'info'
        );
    };

    const handleCancelOrder = () => {
        showNotification(
            "Cancel Order",
            "Are you sure you want to cancel this order?",
            'warning'
        );
    };

    const handleGetHelp = () => {
        showNotification(
            "Help & Support",
            "Connecting you to customer support...",
            'info'
        );
    };

    const getOrderDetailsById = async (orderId) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/order/details/${orderId}`
            );
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    };

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setIsLoading(true);
                const data = await getOrderDetailsById(order_id);
                console.log("Fetched order details:", data.data);
                setOrder(data.data);
            } catch (err) {
                console.error(err);
                showNotification(
                    "Error",
                    "Failed to load order details. Please try again.",
                    'danger'
                );
            } finally {
                setIsLoading(false);
            }
        }

        if (order_id) {
            fetchOrderDetails();
        }
    }, [order_id]);

    if (isLoading) {
        return (
            <>
                <Header />
                <div className="order-tracking-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading your order details...</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="order-tracking-container">
                <Container className="order-tracking-content">
                    {/* Toast Notification */}
                    <div className="order-tracking-toast">
                        <Toast
                            show={showToast}
                            onClose={() => setShowToast(false)}
                            delay={3000}
                            autohide
                            className={`toast-${toastConfig.variant}`}
                        >
                            <Toast.Header className="toast-header">
                                <strong className="me-auto">{toastConfig.title}</strong>
                            </Toast.Header>
                            <Toast.Body className="toast-body">
                                {toastConfig.message}
                            </Toast.Body>
                        </Toast>
                    </div>

                    {/* Header */}
                    <div className="order-tracking-header">
                        <div className="header-icon-container">
                            <Truck className="header-icon" />
                        </div>
                        <h1 className="order-tracking-title">Track Your Order</h1>
                        <p className="order-tracking-subtitle">Real-time updates on your food delivery</p>
                    </div>

                    {/* Order Summary */}
                    <OrderSummaryCard
                        order={{
                            PNR: order.PNR,
                            city: order.city,
                            orderTimeandDate: order.orderTimeandDate,
                            totalAmount: order.totalAmount,
                            status: order.status,
                            stop: order.stop
                        }}
                    />

                    {/* Delivery Progress */}
                    <div className="tracking-section">
                        <div className="section-header">
                            <Clock className="section-icon" />
                            <h3>Delivery Progress</h3>
                        </div>
                        <DeliveryProgressTracker
                            status={order.status}
                            deliveryStatus={order.deliveryStatus}
                        />
                    </div>

                    {/* Customer & Delivery Details */}
                    <div className="tracking-section">
                        <div className="section-header">
                            <User className="section-icon" />
                            <h3>Delivery Details</h3>
                        </div>
                        <CustomerDeliveryDetails
                            customerDetails={order.customerDetails}
                            deliveryStatus={order.deliveryStatus}
                            agentDetails={order.agentId || {}}
                            stop={order.stop}
                            isOtpVerified={order.isOtpVerified}
                        />
                    </div>

                    {/* Order Items */}
                    <div className="tracking-section">
                        <div className="section-header">
                            <MapPin className="section-icon" />
                            <h3>Order Items</h3>
                        </div>
                        <OrderItemsList items={order.Orderitems} />
                    </div>

                    {/* Action Buttons */}
                    <div className="tracking-section">
                        <div className="section-header">
                            <Phone className="section-icon" />
                            <h3>Quick Actions</h3>
                        </div>
                        <ActionButtons
                            status={order.status}
                            onContactRestaurant={handleContactRestaurant}
                            onCancelOrder={handleCancelOrder}
                            onGetHelp={handleGetHelp}
                        />
                    </div>

                    {/* Support Footer */}
                    <div className="support-footer">
                        <p>Need immediate help? Contact our 24/7 support team</p>
                        <div className="support-contact">
                            <Phone size={16} />
                            <span>+91 98765 43210</span>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default OrderTrackingPage;