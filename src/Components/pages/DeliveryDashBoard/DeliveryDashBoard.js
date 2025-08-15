import React, { useState, useEffect } from "react";
import {
    Card,
    Button,
    Badge,
    Tabs,
    Tab,
    Container,
    Row,
    Col
} from "react-bootstrap";
import {
    Navigation,
    Phone,
    CheckCircle,
    Clock,
    MapPin,
    Camera,
    Star,
    DollarSign,
    Package,
    AlertCircle,
    Truck,
    Plus
} from "lucide-react";
import Header from "../../layout/Header/Header";
import "./DeliveryDashBoard.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const DeliveryDashBoard = () => {
    const location = useLocation();
    const [isOnline, setIsOnline] = useState('offline');
    const [availableOrders, setAvailableOrders] = useState([]);
    const [assignedOrders, setAssignedOrders] = useState([]);
    const [currentDelivery, setCurrentDelivery] = useState(null);
    const [deliveryHistory, setDeliveryHistory] = useState([]);
    const { role, response } = location.state || {}// Mocked for this example  
    console.log("role", role);
    console.log("response", response);
    const agentId = response.agent._id || "agent_001"; // Use agent ID from response




    useEffect(() => {
        fetchOrders();
    }, []);
    const getReadyToPickupOrders = async (stop, city) => {
        try {
            const response = await axios.get('http://localhost:4000/api/order/ready-to-pickup', {
                params: { stop, city }
            });
            console.log('Ready to pickup orders:', response.data);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching ready to pickup orders:', error);
            throw error;
        }
    };
    const updateAgentAvailabelity = async (agentId, availabelity
    ) => {
        try {
            const response = await axios.patch(
                `http://localhost:4000/api/agent/availabelity/${agentId}`,
                { availabelity },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Authorization: `Bearer ${token}` // if using JWT auth
                    }
                }
            );
            console.log('Agent availability updated:', response.data.data);
            return response.data;
        } catch (error) {
            console.error('Error updating agent availabelity:', error.response?.data || error.message);
            throw error;
        }
    };
    const updateOrderStatus = async (orderId, status) => {
        try {
            const payload = { status }; // send as object
            const response = await axios.patch(
                `http://localhost:4000/api/order/update-status/${orderId}`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Order status updated:', response);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }
    const getCompletedDeliveriesByAgentId = async (agentId) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/agent/completed-deliveries/${agentId}`
            );
            return response.data.data;
        } catch (error) {
            console.error('Error fetching completed deliveries:', error);
            throw error;
        }
    };

    const assignOrderToAgent = async (orderId) => {
        try {
            const response = await axios.post(
                'http://localhost:4000/api/order/accept-order',
                { orderId, agentId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // If you use JWT authentication, include the token
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error accepting order:', error.response?.data || error.message);
            throw error;
        }
    }


    const getAgentOrdersById = async (agentId) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/agent/orders/${agentId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // Authorization: `Bearer ${token}` // if using JWT auth
                    }
                }
            );
            return response.data.data;
        } catch (error) {
            console.error('Error fetching agent orders:', error.response?.data || error.message);
            throw error;
        }
    };

    const fetchOrders = async () => {
        try {
            const [available, assigned, orderHistory] = await Promise.all([
                getReadyToPickupOrders(response.agent.zone.stop, response.agent.zone.city),
                getAgentOrdersById(agentId),
                getCompletedDeliveriesByAgentId(agentId)
            ]);

            setAvailableOrders(available);
            setAssignedOrders(assigned);
            setDeliveryHistory(orderHistory);

            const activeDelivery = assigned.find(order =>
                ['assigned', 'picked_up', 'in-transit'].includes(order.deliveryStatus)
            );
            setCurrentDelivery(activeDelivery || null);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };


    const handleAcceptOrder = async (orderId) => {
        try {
            await assignOrderToAgent(orderId, agentId);
            fetchOrders();
        } catch (error) {
            console.error('Error accepting order:', error);
        }
    };

    const handleChangingOnlineStatus = async (agentId, status) => {
        try {
            await updateAgentAvailabelity(agentId, status);
            fetchOrders();
            setIsOnline(status);
        } catch (error) {
            console.error('Error updating status:', error);
        }

    }




    const handleUpdateDeliveryStatus = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            fetchOrders();
        } catch (error) {
            console.error('Error updating delivery status:', error);
        }
    };

    const getStatusBadgeVariant = (status) => {
        switch (status) {
            case 'Assigned': return 'primary';
            case 'Picked-up': return 'warning';
            case 'In-transit': return 'info';
            case 'Delivered': return 'success';
            default: return 'secondary';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'Assigned': return 'Go to Restaurant';
            case 'Picked-up': return 'Navigate to Bus Stop';
            case 'In-transit': return 'In Transit';
            case 'Delivered': return 'Delivered';
            default: return status;
        }
    };

    const getNextAction = () => {
        if (!currentDelivery) return null;

        switch (currentDelivery.status) {
            case 'Assigned':
                return {
                    text: 'Reached Restaurant',
                    action: () => handleUpdateDeliveryStatus(currentDelivery._id, 'Picked-up'),
                    variant: 'primary'
                };
            case 'Picked-up':
                return {
                    text: 'Start Delivery',
                    action: () => handleUpdateDeliveryStatus(currentDelivery._id, 'In-transit'),
                    variant: 'warning'
                };
            case 'In-transit':
                return {
                    text: 'Complete Delivery',
                    action: () => handleUpdateDeliveryStatus(currentDelivery._id, 'Delivered'),
                    variant: 'success'
                };
            default:
                return null;
        }
    };

    const stats = [
        { label: 'Today\'s Deliveries', value: '12', icon: Package, color: 'text-primary' },
        { label: 'Earnings', value: '₹850', icon: DollarSign, color: 'text-success' },
        { label: 'Rating', value: '4.8', icon: Star, color: 'text-warning' },
        { label: 'On Time %', value: '95%', icon: Clock, color: 'text-info' }
    ];
    console.log("assignedOrders", assignedOrders);
    console.log("availableOrders", availableOrders);
    console.log("deliveryHistory", deliveryHistory);

    return (
        <div className="delivery-dashboard">
            <Header />

            <Container className="py-4 px-4">
                {/* Header */}
                <Row className="dashboard-header align-items-center">
                    <Col>
                        <h1 className="dashboard-title">Delivery Dashboard</h1>
                        <p className="dashboard-subtitle">{agentId}</p>
                        <div className="d-flex align-items-center gap-2">
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    backgroundColor: isOnline === 'online' ? '#22c55e' : '#ef4444',
                                    marginRight: '8px'
                                }}
                            ></span>
                            <span className="dashboard-subtitle">
                                {isOnline === 'online' ? 'Online' : 'Offline'}
                            </span>
                        </div>
                    </Col>
                    <Col xs="auto">
                        <div className="d-flex align-items-center gap-2">
                            <Button
                                variant={isOnline === 'online' ? 'danger' : 'success'}
                                onClick={() => handleChangingOnlineStatus(agentId, isOnline === 'online' ? 'offline' : 'online')}
                            >
                                {/* {isOnline ? 'Online' : 'Offline'} */}
                                {isOnline === 'online' ? 'Go Offline' : 'Go Online'}
                            </Button>
                            <Badge bg={isOnline ? 'bg-success' : 'bg-danger'} className="bg-opacity-10">
                                {isOnline === 'online' ? 'Available' : 'Unavailable'}
                            </Badge>
                        </div>
                    </Col>
                </Row>

                {/* Stats Cards */}
                <Row className="mb-4 g-3">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Col key={index} md={3}>
                                <Card className="stats-card">
                                    <Card.Body className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="stats-label">{stat.label}</p>
                                            <h3 className={`stats-value ${stat.color}`}>{stat.value}</h3>
                                        </div>
                                        <Icon size={32} className={stat.color} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>

                {/* Main Content */}
                <Tabs defaultActiveKey="current" id="delivery-tabs" className="mb-3">
                    <Tab eventKey="current" title="Current Delivery">
                        {currentDelivery && currentDelivery.status !== 'Delivered' ? (
                            <Card className="mb-4 p-3">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h2 className="mb-0" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                                            Current Delivery
                                        </h2>
                                        <Badge bg={getStatusBadgeVariant(currentDelivery.status)} className="status-badge">
                                            {getStatusText(currentDelivery.status)}
                                        </Badge>
                                    </div>

                                    <Row>
                                        <Col md={6}>
                                            <div className="order-details">
                                                <h3 className="mb-2" style={{ fontWeight: '500' }}>Order Details</h3>
                                                <div className="d-grid gap-2">
                                                    <div className="d-flex justify-content-between">
                                                        <span>Order ID:</span>
                                                        <span className="fw-medium">{currentDelivery._id}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <span>Restaurant:</span>
                                                        <span className="fw-medium">{currentDelivery.restaurantId.name}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <span>Amount:</span>
                                                        <span className="fw-medium">₹{currentDelivery.totalAmount}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <h3 className="mb-2" style={{ fontWeight: '500' }}>Items</h3>
                                                <div className="d-grid gap-1">
                                                    {currentDelivery.Orderitems.map((item, index) => (
                                                        <div key={index} className="order-item">
                                                            <span>{item.name}</span>
                                                            <span>× {item.quantity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {currentDelivery.status === 'in-transit' && (
                                                <div>
                                                    <h3 className="mb-2" style={{ fontWeight: '500' }}>Delivery OTP</h3>
                                                    <div className="font-monospace fw-bold text-primary bg-primary bg-opacity-10 p-3 rounded text-center" style={{ fontSize: '1.5rem' }}>
                                                        {currentDelivery.otp}
                                                    </div>
                                                    <p className="text-muted text-center mt-1" style={{ fontSize: '0.75rem' }}>
                                                        Passenger will provide this OTP for verification
                                                    </p>
                                                </div>
                                            )}
                                        </Col>

                                        <Col md={6}>
                                            <div className="customer-details">
                                                <h3 className="mb-2" style={{ fontWeight: '500' }}>Customer Details</h3>
                                                <div className="d-grid gap-2">
                                                    <div className="d-flex justify-content-between">
                                                        <span>Name:</span>
                                                        <span className="fw-medium">{currentDelivery.customerDetails.name
                                                        }</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <span>Phone:</span>
                                                        <span className="fw-medium">{currentDelivery.customerDetails.phone}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <span>PNR:</span>
                                                        <span className="fw-medium">{currentDelivery.PNR}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <span>Seat:</span>
                                                        <span className="fw-medium">{currentDelivery.customerDetails.seatNo}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <span>Route:</span>
                                                        <span className="fw-medium">{currentDelivery.bus_route || 'Bus Route'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="mb-2" style={{ fontWeight: '500' }}>Delivery Location</h3>
                                                <div className="delivery-location">
                                                    <MapPin size={16} className="text-primary mt-1" />
                                                    <div>
                                                        <p className="fw-medium mb-0">{currentDelivery.restaurantId.location.stop}</p>
                                                        <p className="fw-medium mb-0">{currentDelivery.restaurantId.location.city}</p>
                                                        <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Delivery Point</p>
                                                        {/* <p className="text-muted" style={{ fontSize: '0.875rem' }}>ETA: {currentDelivery.delivery_time}</p> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                    <div className="action-buttons">
                                        {/* Remove the always-rendered "Picked up" button */}
                                        {/* Only render getNextAction() button if available */}
                                        {getNextAction() && (
                                            <Button
                                                variant={getNextAction().variant}
                                                onClick={getNextAction().action} // This calls handleUpdateDeliveryStatus with correct status
                                                className="d-flex align-items-center"
                                            >
                                                <CheckCircle size={16} className="me-2" />
                                                {getNextAction().text}
                                            </Button>
                                        )}
                                        <Button variant="outline-primary" className="d-flex align-items-center">
                                            <Phone size={16} className="me-2" />
                                            Call Customer
                                        </Button>

                                        {currentDelivery.status === 'In-transit' && (
                                            <Button variant="outline-secondary" className="d-flex align-items-center">
                                                <Camera size={16} className="me-2" />
                                                Upload Proof
                                            </Button>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        ) : (
                            <Card className="no-deliveries">
                                <Card.Body>
                                    <Package size={64} className="no-deliveries-icon" />
                                    <h3 className="mb-2" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                                        No Active Deliveries
                                    </h3>
                                    <p className="text-muted mb-4">
                                        You're online and ready to receive new delivery assignments
                                    </p>
                                    <div className="waiting-indicator">
                                        <div className="waiting-dot"></div>
                                        <span>Waiting for orders...</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        )}
                    </Tab>

                    <Tab eventKey="available" title="Available Orders">
                        <div className="d-grid gap-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <h2 className="mb-0" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                                    Available Orders
                                </h2>
                                <Badge bg="success" className="bg-opacity-10 text-success">
                                    {isOnline === 'online' ? availableOrders.length : 0} Available
                                </Badge>
                            </div>

                            {isOnline === 'online' ? (
                                availableOrders.length > 0 ? (
                                    availableOrders.map((order) => (
                                        <Card key={order.id} className="p-3">
                                            <Card.Body>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <div className="flex-grow-1">
                                                        <div className="d-flex align-items-center gap-2 mb-2">
                                                            <h5 className="mb-0" style={{ fontWeight: '600' }}>Order #{order.id}</h5>
                                                            <Badge bg="success">Ready for Pickup</Badge>
                                                        </div>
                                                        <p className="text-muted mb-2" style={{ fontSize: '0.875rem' }}>
                                                            Customer: {order.customerDetails.name} | Seat {order.customerDetails.seatNo} | PNR: {order.PNR}
                                                        </p>
                                                        <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                                                            Destination: {order.stop}
                                                        </p>
                                                    </div>
                                                    <div className="text-end">
                                                        <h5 className="mb-0">₹{order.total}</h5>
                                                        <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                                                            {order.Orderitems.length} items
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <h6 className="fw-medium" style={{ fontSize: '0.875rem' }}>Items:</h6>
                                                    <div className="d-grid gap-1">
                                                        {order.Orderitems.map((item, index) => (
                                                            <div key={index} className="order-item">
                                                                <span>{item.name} × {item.quantity}</span>
                                                                <span>₹{item.price * item.quantity}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="d-flex gap-2">
                                                    <Button
                                                        variant="primary"
                                                        onClick={() => handleAcceptOrder(order._id)}
                                                        className="flex-grow-1 d-flex align-items-center"
                                                    >
                                                        <Plus size={16} className="me-2" />
                                                        Accept Order
                                                    </Button>
                                                    <Button variant="outline-primary" className="d-flex align-items-center">
                                                        <MapPin size={16} className="me-2" />
                                                        View Location
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    ))
                                ) : (
                                    <Card className="no-deliveries">
                                        <Card.Body>
                                            <Truck size={64} className="no-deliveries-icon" />
                                            <h3 className="mb-2" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                                                No Available Orders
                                            </h3>
                                            <p className="text-muted">
                                                All orders are currently assigned or being prepared
                                            </p>
                                        </Card.Body>
                                    </Card>
                                )
                            ) : (
                                <Card className="no-deliveries">
                                    <Card.Body>
                                        <Truck size={64} className="no-deliveries-icon" />
                                        <h3 className="mb-2" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                                            You are Offline
                                        </h3>
                                        <p className="text-muted">
                                            Go online to view and accept available orders.
                                        </p>
                                    </Card.Body>
                                </Card>
                            )}
                        </div>
                    </Tab>

                    <Tab eventKey="history" title="Delivery History">
                        <Card className="p-3">
                            <Card.Body>
                                <h2 className="mb-4" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                                    Today's Completed Deliveries
                                </h2>

                                {deliveryHistory.length > 0 ? (
                                    <div className="d-grid gap-3">
                                        {deliveryHistory.map((delivery) => (
                                            <div key={delivery.id} className="delivery-history-item">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="delivery-history-icon">
                                                        <CheckCircle size={20} className="text-success" />
                                                    </div>
                                                    <div>
                                                        <p className="fw-medium mb-0">{delivery.customerDetails.name}</p>
                                                        <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>
                                                            Delivered Location: {delivery.stop || 'N/A'}, {delivery.city || 'N/A'}
                                                        </p>
                                                        <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>
                                                            Delivered at {delivery.deliveryTime || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="text-end">
                                                        <p className="fw-bold mb-0">₹{delivery.totalAmount}</p>
                                                        <div className="star-rating">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={12}
                                                                    className={i < delivery.rating ? "star-filled" : "star-empty"}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-4 text-muted">
                                        <AlertCircle size={48} className="mb-3 opacity-50" />
                                        <p>No deliveries completed today</p>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Tab>
                </Tabs>
            </Container>
        </div>
    );
};

export default DeliveryDashBoard;