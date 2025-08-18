// import React from 'react'
// import Header from '../../layout/Header/Header'
// import Footer from '../../layout/Footer/Footer'
// import { useNavigate } from 'react-router-dom'
// import { useEffect, useState } from 'react'
// import './MyOrdersPage.css'
// import axios from 'axios'

// const MyOrdersPage = () => {
//     const [orderDetails, setOrderDetails] = useState([]);

//     console.log(JSON.parse(localStorage.getItem('travelerData')));

//     const token = JSON.parse(localStorage.getItem('travelerData'))?.token;
//     const user = JSON.parse(localStorage.getItem('travelerData'))?.user;
//     const userId = user?._id;
//     console.log('token in userManagement', token);



//     const fetchOrderDetailsById = async (userId, token) => {
//         try {
//             const response = await axios.get(
//                 `http://localhost:4000/api/user/orders/${userId}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}` // if your API requires authentication
//                     }
//                 }
//             );
//             return response.data;
//         } catch (error) {
//             // Handle error appropriately
//             throw error.response ? error.response.data : error;
//         }
//     }

//     useEffect(() => {
//         const getOrderDetails = async () => {
//             try {
//                 const orderDetails = await fetchOrderDetailsById(userId, token);
//                 console.log('Order Details:', orderDetails);
//                 setOrderDetails(orderDetails.data);
//             } catch (error) {
//                 console.error('Error fetching order details:', error);
//             }
//         };
//         getOrderDetails();
//     }, [userId, token]);
//     return (
//         <>
//             <Header />
//             <div className='MyOrderPage-mainContainer'><h1>My OrdersPage</h1></div>
//             <Footer />
//         </>
//     )
// }

// export default MyOrdersPage

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Button,
    Badge,
    Container,
    Spinner
} from 'react-bootstrap';
import {
    Clock,
    MapPin,
    Phone,
    User,
    ArrowRight,
    Package
} from 'lucide-react';
import axios from 'axios'

import './MyOrdersPage.css'
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const [orderDetails, setOrderDetails] = useState([]);

    console.log(JSON.parse(localStorage.getItem('travelerData')));

    const token = JSON.parse(localStorage.getItem('travelerData'))?.token;
    const user = JSON.parse(localStorage.getItem('travelerData'))?.user;
    const userId = user?._id;
    console.log('token in userManagement', token);



    const fetchOrderDetailsById = async (userId, token) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/user/orders/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}` // if your API requires authentication
                    }
                }
            );
            return response.data;
        } catch (error) {
            // Handle error appropriately
            throw error.response ? error.response.data : error;
        }
    }

    useEffect(() => {
        const getOrderDetails = async () => {
            try {
                const orderDetails = await fetchOrderDetailsById(userId, token);
                console.log('Order Details:', orderDetails);
                setOrderDetails(orderDetails.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };
        getOrderDetails();
    }, [userId, token]);
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
        const timer = setTimeout(() => {

            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const getStatusBadgeVariant = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return 'success';
            case 'placed':
                return 'warning';
            case 'cancelled':
                return 'danger';
            default:
                return 'primary';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleOrderClick = async (orderId) => {

        const response = await getOrderDetailsById(orderId)
        navigate(`/order-tracking`, {
            state: {
                order_id: response.data._id,
            }
        });
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="text-center">
                    <Package className="loading-icon" />
                    <p className="text-muted">Loading your orders...</p>
                </div>
            </div>
        );
    }

    console.log("Order details:", orderDetails);

    return (
        <>
            <Header />
            <div className="orders-container">
                <Container className="orders-content">
                    <div className="orders-header">
                        <h1 className="orders-title">My Orders</h1>
                        <p className="orders-subtitle">Track and view your food delivery orders</p>
                    </div>

                    {orderDetails.length === 0 ? (
                        <Card className="no-orders">
                            <Card.Body>
                                <Package className="no-orders-icon" />
                                <h3 className="mb-3">No orders yet</h3>
                                <p className="text-muted mb-4">You haven't placed any orders yet</p>
                                <Button onClick={() => navigate('/')}>Start Ordering</Button>
                            </Card.Body>
                        </Card>
                    ) : (
                        <div>
                            {orderDetails.map((order) => (
                                <Card
                                    key={order._id}
                                    className="order-card"
                                    onClick={() => handleOrderClick(order._id)}
                                >
                                    <Card.Header className="order-header">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="order-restaurant">
                                                <div className="order-icon">
                                                    <Package size={20} color="#0d6efd" />
                                                </div>
                                                <div>
                                                    <h3 className="order-restaurant-name">{order.restaurantId.name}</h3>
                                                    <p className="order-restaurant-cuisine">{order.restaurantId.cuisineType}</p>
                                                </div>
                                            </div>
                                            <Badge bg={getStatusBadgeVariant(order.status)}>
                                                {order.status}
                                            </Badge>
                                        </div>
                                    </Card.Header>
                                    <Card.Body className="order-body">
                                        <div className="order-details">
                                            <div>
                                                <div className="order-detail-item">
                                                    <User size={16} className="text-muted" />
                                                    <span>{order.customerDetails.name}</span>
                                                    <span className="order-divider">•</span>
                                                    <span>{order.customerDetails.seatNo}</span>
                                                </div>
                                                <div className="order-detail-item">
                                                    <MapPin size={16} className="text-muted" />
                                                    <span>{order.stop}</span>
                                                    <span className="order-divider">•</span>
                                                    <span>{order.city}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="order-detail-item">
                                                    <Clock size={16} className="text-muted" />
                                                    <span>{formatDate(order.createdAt)}</span>
                                                </div>
                                                <div className="order-detail-item">
                                                    <Phone size={16} className="text-muted" />
                                                    <span>PNR: {order.PNR}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="order-footer">
                                            <div>
                                                <p className="order-items-count">{order.Orderitems.length} items</p>
                                                <p className="order-total">₹{order.totalAmount}</p>
                                            </div>
                                            <Button variant="outline-primary" size="sm" className="d-flex align-items-center gap-2">
                                                View Details
                                                <ArrowRight size={16} />
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    )}
                </Container>
            </div>

            <Footer />
        </>
    );

};

// Dummy data (same as in your original component)


export default MyOrders;