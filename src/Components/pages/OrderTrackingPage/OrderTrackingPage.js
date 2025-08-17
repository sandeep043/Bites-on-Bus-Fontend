import React, { use, useEffect, useState } from 'react';
import { Container, ToastContainer, Toast } from 'react-bootstrap';
import OrderSummaryCard from "../../layout/OrderStatusLayout/OrderSummaryCard";
import DeliveryProgressTracker from "../../layout/OrderStatusLayout/DeliveryProgressTracker";
import CustomerDeliveryDetails from "../../layout/OrderStatusLayout/CustomerDeliveryDetails";
import OrderItemsList from "../../layout/OrderStatusLayout/OrderItemsList";
import ActionButtons from "../../layout/OrderStatusLayout/ActionButtons";
import { useLocation } from 'react-router-dom'; 
import axios from 'axios';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';

const sampleOrder = {
    "_id": "689c7eb6349646d817c5fc38",
    "userId": "689ad3f27ac9109206dfc07f",
    "restaurantId": "6899f35c93d4c9555fe503e0",
    "PNR": "6898fa79be61e37e43611f61",
    "stop": "North Stop",
    "city": "City B",
    "orderTimeandDate": "2024-11-30T14:30:00.000Z",
    "customerDetails": {
        "name": "sandeep",
        "phone": "111111111111111",
        "seatNo": "asdf"
    },
    "Orderitems": [
        {
            "name": "bajji",
            "price": 100,
            "prepTime": 10,
            "dietaryTags": ["snack"],
            "isAvailable": true,
            "_id": "689a02dc824e64a58d139a1f",
            "quantity": 1
        },
        {
            "name": "mirapkaya bajji",
            "price": 200,
            "prepTime": 5,
            "dietaryTags": ["hot", "snack"],
            "isAvailable": false,
            "_id": "689a040d824e64a58d139a3e",
            "quantity": 1
        },
        {
            "name": "egg bajji",
            "price": 60,
            "prepTime": 20,
            "dietaryTags": ["non-veg"],
            "isAvailable": true,
            "_id": "689acbac7ac9109206dfbe5d",
            "quantity": 1
        }
    ],
    "totalAmount": 360,
    "status": "Placed",
    "paymentId": "689c7eac349646d817c5fc34",
    "isOtpVerified": false,
    "deliveryStatus": "pending",
    "createdAt": "2025-08-13T12:01:58.912Z"
};


const OrderTrackingPage = () => { 
    const location = useLocation();
    const { order_id } = location.state || {};
    const [order, setOrder] = useState(sampleOrder); // Default to sample order for initial render


    console.log("Order ID from state:", order_id);
    const [showToast, setShowToast] = useState(false);
    const [toastConfig, setToastConfig] = useState({
        title: '',
        message: '',
        variant: 'success'
    });

    const showNotification = (title, message, variant = 'success') => {
        setToastConfig({ title, message, variant });
        setShowToast(true);
    };

    const handleContactRestaurant = () => {
        showNotification(
            "Contacting Restaurant",
            "Opening phone dialer..."
        );
    };

    const handleCancelOrder = () => {
        showNotification(
            "Cancel Order",
            "Are you sure you want to cancel this order?",
            'danger'
        );
    };

    const handleGetHelp = () => {
        showNotification(
            "Help & Support",
            "Connecting you to customer support..."
        );
    }; 




    const getOrderDetailsById = async (orderId) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/order/details/${orderId}`
    );
    return response.data; // Contains status and data
  } catch (error) {
    // Handle error as needed
    throw error.response ? error.response.data : error;
  }
};
 
useEffect(() => {  
   const fetchOrderDetails = async () => {
  try {
    const data = await getOrderDetailsById(order_id); 
    console.log("Fetched order details:", data.data);
    setOrder(data.data); 
  } catch (err) {
    console.error(err);
  }
}
   fetchOrderDetails(); 
    

}, [order_id]); 

console.log("Order details:", order);
    return (
        <> 
        <Header/>
        <div className="min-vh-100 bg-light">
            <Container className="py-4" style={{ maxWidth: '900px' }}>
                {/* Toast Notification */}
                <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
                    <Toast
                        show={showToast}
                        onClose={() => setShowToast(false)}
                        delay={3000}
                        autohide
                        bg={toastConfig.variant}
                    >
                        <Toast.Header>
                            <strong className="me-auto">{toastConfig.title}</strong>
                        </Toast.Header>
                        <Toast.Body className="text-white">
                            {toastConfig.message}
                        </Toast.Body>
                    </Toast>
                </div>

                {/* Header */}
                <div className="text-center py-4">
                    <h1 className="mb-3">Track Your Order</h1>
                    <p className="text-muted">Real-time updates on your food delivery</p>
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
                <div className="bg-white rounded p-4 shadow-sm mb-4">
                    <DeliveryProgressTracker
                        status={order.status}
                        deliveryStatus={order.deliveryStatus}
                    />
                </div>

                {/* Customer & Delivery Details */}
                <CustomerDeliveryDetails
                    customerDetails={order.customerDetails}
                    deliveryStatus={order.deliveryStatus} 
                    agentDetails={order.agentId || {}} // if agentId is not available, it will be an empty object
                    stop={order.stop}
                    isOtpVerified={order.isOtpVerified}
                />

                {/* Order Items */}
                <OrderItemsList items={order.Orderitems} />

                {/* Action Buttons */}
                <div className="bg-white rounded p-4 shadow-sm mb-4">
                    <ActionButtons
                        status={order.status}
                        onContactRestaurant={handleContactRestaurant}
                        onCancelOrder={handleCancelOrder}
                        onGetHelp={handleGetHelp}
                    />
                </div>

                {/* Footer */}
                <div className="text-center py-4 small text-muted">
                    <p>Need help? Contact our 24/7 support team</p>
                </div>
            </Container>
        </div> 
        <ToastContainer position="top-end" className="p-3" />
        <Footer/>
        </>
    );
}

export default OrderTrackingPage

