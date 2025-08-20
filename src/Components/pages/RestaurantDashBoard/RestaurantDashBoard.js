import React, { useState, useEffect, use } from "react";
import {
    Card,
    Button,
    Badge,
    Tabs,
    Tab,
    Form,
    InputGroup,
    FormControl,
    ListGroup,
    Container,
    Row,
    Col
} from "react-bootstrap";
import {
    Bell,
    TrendingUp,
    DollarSign,
    Clock,
    Star,
    Plus,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    AlertCircle,
    User,
    Phone,
    Truck
} from "lucide-react";
import Header from "../../layout/Header/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";


const RestaurantDashBoard = () => {
    const location = useLocation();
    const [activeOrders, setActiveOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const restaurantId = "rest_001"; // This would come from auth context  
    const [restaurantData, setRestaurantData] = useState(null);
    const [restaurantActiveOrders, setRestaurantActiveOrders] = useState([]);
    const { role, response } = location.state || {}// Mocked for this example 
    const [menuItems, setMenuItems] = useState([]);
    const [todayTotalOrders, setTodayTotalOrders] = useState(0);
    const [todayRevenue, setTodayRevenue] = useState(0);
    const restaurantLocalStorage = localStorage.getItem('restaurantData')
        ? JSON.parse(localStorage.getItem('restaurantData'))
        : null;

    console.log('restaurantLocalStorage', restaurantLocalStorage);

    const restaurantName = restaurantLocalStorage?.owner.ownedRestaurant.name || "Punjabi Dhaba - Highway Rest Point";

    const token = restaurantLocalStorage?.token; // Get the token from localStorage 
    console.log('token', token);

    const fetchRestaurantData = async () => {
        try {
            const id = response.owner.ownedRestaurant._id;
            const Responsedata = await axios.get(
                `http://localhost:4000/api/restaurant/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` // if using JWT auth
                    }
                }
            );
            if (Responsedata) {
                setRestaurantData(Responsedata.data.restaurant);
            }

        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    useEffect(() => {
        fetchRestaurantData();
    }, []);

    // console.log('Restaurant Data:', restaurantData);
    // console.log('Restaurant menu data:', restaurantData?.menu);


    const addMenuItem = async (restaurantId, menuItem) => {
        try {
            // restaurantId as query parameter
            const response = await axios.post(
                `http://localhost:4000/api/restaurant/${restaurantId}/menu`,
                menuItem, // payload
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` // if using JWT auth
                    }
                }
            );
            console.log('Menu item added:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding menu item:', error.response?.data || error.message);
            throw error;
        }
    };
    const getCompletedOrdersByRestaurant = async (restaurantId) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/order/restaurant/${restaurantId}/completed`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching completed orders:', error);
            throw error;
        }
    }

    const getActiveOrdersByRestaurant = async (restaurantId) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/order/restaurant/${restaurantId}/active`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching active orders:', error);
            throw error;
        }
    }


    const updateOrderStatus = async (orderId, status) => {
        try {
            const payload = { status }; // send as object
            const response = await axios.patch(
                `http://localhost:4000/api/order/update-status/${orderId}`,
                payload
            );
            console.log('Order status updated:', response);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }




    useEffect(() => {
        fetchOrders();
        if (restaurantData && restaurantData.menu) {
            setMenuItems(restaurantData.menu);
        }
    }, [restaurantData]);




    const [newItem, setNewItem] = useState({
        name: '',
        price: '',
        dietaryTags: [],
        isAvailable: false,
        prepTime: ''
    });

    const fetchOrders = async () => {
        try {
            console.log('dumi', restaurantData);
            const orders = await getActiveOrdersByRestaurant(restaurantData._id);
            const completedOrdersdata = await getCompletedOrdersByRestaurant(restaurantData._id);
            console.log('Fetched orders:', orders);
            const active = orders.filter(order =>
                ['Placed', 'Preparing', 'Ready', 'Assigned', 'Ready to pickup', 'Picked-up', 'In-transit'].includes(order.status)
            );
            const completed = orders.filter(order =>
                order.status === 'Completed' || order.status === 'Delivered'
            );
            setActiveOrders(active);
            setCompletedOrders(completedOrdersdata);
            setTodayRevenue(completedOrdersdata.reduce((sum, order) => sum + order.totalAmount, 0));
            setTodayTotalOrders(completedOrdersdata.length + activeOrders.length);

        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };


    const deleteMenuItem = async (restaurantId, menuItemId) => {
        try {
            const response = await axios.delete(
                `http://localhost:4000/api/restaurant/${restaurantId}/menu/${menuItemId}`
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` // if using JWT auth
                    }
                });
            console.log('Menu item deleted:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting menu item:', error.response?.data || error.message);
            throw error;
        }
    };

    const updateMenuItemAvailability = async (restaurantId, menuItemId, isAvailable) => {
        try {
            const response = await axios.patch(
                `http://localhost:4000/api/restaurant/${restaurantId}/menu/${menuItemId}/availability`,
                { isAvailable }, // payload
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Menu item availability updated:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating menu item availability:', error.response?.data || error.message);
            throw error;
        }
    };


    const handleAddMenuItem = async (item) => {
        if (!item.name || !item.price) {
            alert('Please enter both name and price for the menu item.');
            return;
        }
        try {
            await addMenuItem(restaurantData._id, item);
            // 2. Refetch restaurant data to get updated menu
            await fetchRestaurantData();
            // Optionally reset form
            setNewItem({
                name: '',
                price: '',
                dietaryTags: [],
                isAvailable: '',
                prepTime: ''

            });
        } catch (error) {
            console.error('Error adding menu item:', error);
        }
    };





    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            fetchOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleToggleItemAvailability = async (item) => {
        try {
            await updateMenuItemAvailability(restaurantData._id, item._id, !item.isAvailable);
            await fetchRestaurantData();
        } catch (error) {
            console.error('Error toggling item availability:', error);
        }
    };

    const handleDeleteMenuItem = async (item) => {
        if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
            try {
                await deleteMenuItem(restaurantData._id, item._id);
                await fetchRestaurantData();
            } catch (error) {
                console.error('Error deleting menu item:', error);
            }
        }
    };
    const getStatusBadgeVariant = (status) => {
        switch (status) {
            case 'Placed': return 'warning';
            case 'Ready': return 'success';
            case 'Picked-up': return 'primary';
            default: return 'secondary';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Placed': return <Clock size={16} />;
            case 'Ready': return <CheckCircle size={16} />;
            case 'Picked-up': return <AlertCircle size={16} />;
            default: return <XCircle size={16} />;
        }
    };

    const stats = [
        { label: 'Today\'s Orders', value: todayTotalOrders, icon: Bell, color: 'text-primary' },
        { label: 'Revenue', value: todayRevenue, icon: DollarSign, color: 'text-success' },
        { label: 'Avg Rating', value: '4.5', icon: Star, color: 'text-warning' },
        { label: 'Prep Time', value: '15 min', icon: Clock, color: 'text-info' }
    ];

    console.log('Active Orders:', activeOrders);
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Header />

            <Container className="py-4 px-4">
                {/* Header */}
                <Row className="mb-4 align-items-center">
                    <Col>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: '700', fontFamily: 'Poppins, sans-serif' }}>
                            Restaurant Dashboard
                        </h1>
                        <p style={{ color: '#6c757d' }}>{restaurantName}</p>
                        {/* cu  isine type  */}
                        <p style={{ color: '#6c757d' }}>{restaurantLocalStorage?.owner.ownedRestaurant.cuisineType}</p>
                    </Col>
                    <Col xs="auto">
                        <div className="d-flex align-items-center gap-2">
                            <Button variant="outline-primary" className="d-flex align-items-center">
                                <Bell size={16} className="me-2" />
                                Notifications
                            </Button>
                            <Badge bg="success" className="bg-opacity-10 text-success">
                                Online
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
                                <Card className="p-3 h-100">
                                    <Card.Body className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="text-muted mb-1" style={{ fontSize: '0.875rem' }}>{stat.label}</p>
                                            <h3 className={stat.color} style={{ fontWeight: '700' }}>{stat.value}</h3>
                                        </div>
                                        <Icon size={32} className={stat.color} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>

                {/* Main Content */}
                <Tabs defaultActiveKey="orders" id="dashboard-tabs" className="mb-3">
                    <Tab eventKey="orders" title="Order Management">
                        <div className="mt-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', fontFamily: 'Poppins, sans-serif' }}>
                                    Active Orders
                                </h2>
                                <div className="d-flex gap-2">
                                    <Badge bg="warning" className="bg-opacity-10 text-warning">
                                        {activeOrders.filter(o => o.status === 'Preparing').length} Preparing
                                    </Badge>
                                    <Badge bg="success" className="bg-opacity-10 text-success">
                                        {activeOrders.filter(o => o.status === 'Ready').length} Ready
                                    </Badge>
                                </div>
                            </div>

                            <div className="d-grid gap-3">
                                {activeOrders.map((order) => (
                                    <Card key={order.id} className="p-3">
                                        <Card.Body>
                                            <div className="d-flex justify-content-between mb-3">
                                                <div>
                                                    <div className="d-flex align-items-center gap-2 mb-2">
                                                        <h5 className="mb-0" style={{ fontWeight: '600' }}>Order #{order._id}</h5>
                                                        <Badge bg={getStatusBadgeVariant(order.status)} className="d-flex align-items-center gap-1">
                                                            {getStatusIcon(order.status)}
                                                            <span style={{ textTransform: 'capitalize' }}>
                                                                {order.status.replace('-', ' ')}
                                                            </span>
                                                        </Badge>
                                                    </div>
                                                    <p className="text-muted mb-1" style={{ fontSize: '0.875rem' }}>
                                                        PNR: {order.PNR} | {order.customerDetails.name
                                                        } | Seat {order.customerDetails.seatNo}
                                                    </p>
                                                    <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                                                        Phone: {order.customerDetails.phone} | Stop: {order.stop}
                                                    </p>

                                                    {order.agentId && (
                                                        <div className="mt-2 p-2 bg-info bg-opacity-10 rounded">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <User size={16} className="text-info" />
                                                                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                                                                    Agent Name: {order.agentId.name}
                                                                </span>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-2 mt-1">
                                                                <Phone size={16} className="text-info" />
                                                                <span style={{ fontSize: '0.875rem' }}>{order.agentId.phone}</span>
                                                                <Truck size={16} className="text-info ms-2" />
                                                                <span style={{ fontSize: '0.875rem' }}>{order.agentId.vehicleType}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="text-end">
                                                    <h5 className="mb-0">₹{order.total}</h5>
                                                    <p className="text-muted mb-1" style={{ fontSize: '0.875rem' }}>
                                                        Order: {order.order_time} | Delivery: {order.delivery_time}
                                                    </p>
                                                    {order.otp && (
                                                        <div className="mt-1">
                                                            <span className="text-muted me-1" style={{ fontSize: '0.75rem' }}>OTP:</span>
                                                            <span className="font-monospace fw-bold text-primary">{order.otp}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <ListGroup variant="flush" className="mb-3">
                                                {order.Orderitems.map((item, index) => (
                                                    <ListGroup.Item key={index} className="d-flex justify-content-between px-0">
                                                        <span style={{ fontSize: '0.875rem' }}>
                                                            {item.name} × {item.quantity}
                                                        </span>
                                                        <span style={{ fontSize: '0.875rem' }}>
                                                            ₹{item.price * item.quantity}
                                                        </span>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>

                                            <div className="d-flex gap-2">
                                                {order.status === 'Placed' && (
                                                    <Button
                                                        variant="success"
                                                        onClick={() => handleUpdateOrderStatus(order._id, 'Ready')}
                                                        className="d-flex align-items-center"
                                                    >
                                                        <CheckCircle size={16} className="me-2" />
                                                        Mark Ready
                                                    </Button>
                                                )}
                                                {order.status === 'Ready' && (
                                                    <Button
                                                        variant="primary"
                                                        onClick={() => handleUpdateOrderStatus(order._id, 'Ready to pickup')}
                                                        className="d-flex align-items-center"
                                                    >
                                                        <AlertCircle size={16} className="me-2" />
                                                        Assign a Delivery Agent
                                                    </Button>
                                                )}
                                                {/* {order.status === 'In-transit' && (
                                                    <Button
                                                        variant="info"
                                                        onClick={() => handleUpdateOrderStatus(order._id, 'Delivered')}
                                                        className="d-flex align-items-center"
                                                    >
                                                        <CheckCircle size={16} className="me-2" />
                                                        Complete Order
                                                    </Button>
                                                )} */}
                                                <Button variant="outline-primary">
                                                    Contact Customer
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </Tab>

                    <Tab eventKey="menu" title="Menu Editor">
                        <div className="mt-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', fontFamily: 'Poppins, sans-serif' }}>
                                    Menu Items
                                </h2>
                                <Button variant="primary" className="d-flex align-items-center">
                                    <Plus size={16} className="me-2" />
                                    Add New Item
                                </Button>
                            </div>

                            <Row>
                                <Col md={6} className="mb-3 mb-md-0">
                                    <div className="d-grid gap-3">
                                        {menuItems && menuItems.length > 0 ? (
                                            menuItems.map((item) => (
                                                <Card key={item._id} className="p-2">
                                                    <Card.Body className="d-flex justify-content-between align-items-center p-2">
                                                        <div className="flex-grow-1">
                                                            <div className="d-flex align-items-center gap-2 mb-1">
                                                                <h6 className="mb-0" style={{ fontWeight: '500' }}>{item.name}</h6>
                                                                <Badge bg="light" text="dark" className="fs-6">
                                                                    {item.category}
                                                                </Badge>
                                                                <Badge bg={item.isAvailable ? 'success' : 'danger'} className="bg-opacity-20">
                                                                    {item.isAvailable ? 'Available' : 'Out of Stock'}
                                                                </Badge>
                                                            </div>
                                                            <p className="text-primary fw-bold mb-0">₹{item.price}</p>
                                                        </div>
                                                        <div className="d-flex gap-1">
                                                            <Button
                                                                size="sm"
                                                                variant="outline-secondary"
                                                                onClick={() => handleToggleItemAvailability(item)}
                                                            >
                                                                {item.isAvailable ? 'Disable' : 'Enable'}
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline-danger"
                                                                onClick={() => handleDeleteMenuItem(item)}
                                                            >
                                                                <Trash2 size={16} />
                                                            </Button>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            ))
                                        ) : (
                                            <div className="text-center py-5">
                                                <h5 className="mb-3">No menu items found.</h5>
                                                <p className="text-muted mb-3">Add items to your menu to start receiving orders.</p>
                                                {/* <Button variant="primary" className="d-flex align-items-center mx-auto" >
                                                    <Plus size={16} className="me-2" />
                                                    Add New Item
                                                </Button> */}
                                            </div>
                                        )}
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <Card className="p-3">
                                        <Card.Body>
                                            <h5 className="mb-3" style={{ fontWeight: '600', fontFamily: 'Poppins, sans-serif' }}>
                                                Add New Menu Item
                                            </h5>
                                            <Form>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Item Name</Form.Label>
                                                    <FormControl
                                                        placeholder="Enter item name"
                                                        value={newItem.name}
                                                        onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Price (₹)</Form.Label>
                                                    <FormControl
                                                        type="number"
                                                        placeholder="Enter price"
                                                        value={newItem.price}
                                                        onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Available</Form.Label>
                                                    <Form.Select
                                                        value={newItem.isAvailable}
                                                        onChange={(e) =>
                                                            setNewItem(prev => ({
                                                                ...prev,
                                                                isAvailable: e.target.value === "true"
                                                            }))
                                                        }
                                                    >
                                                        <option value="">Select availability</option>
                                                        <option value="true">Available</option>
                                                        <option value="false">Not Available</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Dietary Tags</Form.Label>
                                                    <FormControl
                                                        placeholder="Enter tags separated by commas (e.g. vegetarian,vegan,gluten-free)"
                                                        value={newItem.dietaryTags.join(',')}
                                                        onChange={(e) =>
                                                            setNewItem(prev => ({
                                                                ...prev,
                                                                dietaryTags: e.target.value
                                                                    .split(',')
                                                                    .map(tag => tag.trim())
                                                                    .filter(tag => tag.length > 0)
                                                            }))
                                                        }
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>prepTime</Form.Label>
                                                    <FormControl
                                                        type="number"
                                                        placeholder="Enter item prepTime"
                                                        value={newItem.prepTime}
                                                        onChange={(e) => setNewItem(prev => ({ ...prev, prepTime: e.target.value }))}
                                                        rows={3}
                                                    />
                                                </Form.Group>
                                                <Button
                                                    variant="primary"
                                                    disabled={!newItem.name || !newItem.price}
                                                    className="w-100"
                                                    onClick={() => handleAddMenuItem(newItem)}
                                                >
                                                    Add Item
                                                </Button>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Tab>

                    <Tab eventKey="analytics" title="Performance Analytics">
                        <div className="mt-4">
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', fontFamily: 'Poppins, sans-serif' }}>
                                Performance Analytics
                            </h2>

                            <Row className="mt-3 g-3">
                                <Col md={6}>
                                    <Card className="p-3">
                                        <Card.Body>
                                            <h5 className="mb-3" style={{ fontWeight: '600', fontFamily: 'Poppins, sans-serif' }}>
                                                Today's Performance
                                            </h5>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item className="d-flex justify-content-between px-0 py-2">
                                                    <span>Total Orders:</span>
                                                    <span className="fw-bold">{activeOrders.length + completedOrders.length}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between px-0 py-2">
                                                    <span>Active Orders:</span>
                                                    <span className="fw-bold">{activeOrders.length}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between px-0 py-2">
                                                    <span>Completed Orders:</span>
                                                    <span className="fw-bold">{completedOrders.length}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className="d-flex justify-content-between px-0 py-2">
                                                    <span>Total Revenue:</span>
                                                    <span className="fw-bold">
                                                        ₹{completedOrders.reduce((sum, order) => sum + order.totalAmount, 0)}
                                                    </span>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={6}>
                                    <Card className="p-3">
                                        <Card.Body>
                                            <h5 className="mb-3" style={{ fontWeight: '600', fontFamily: 'Poppins, sans-serif' }}>
                                                Completed Orders
                                            </h5>
                                            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                                {completedOrders.length > 0 ? (
                                                    <ListGroup variant="flush">
                                                        {completedOrders.map((order) => (
                                                            <ListGroup variant="flush">
                                                                {completedOrders.map((order) => (
                                                                    <ListGroup.Item
                                                                        key={order._id}
                                                                        className="d-flex justify-content-between align-items-center px-0 py-2 bg-success bg-opacity-10 rounded mb-1"
                                                                    >
                                                                        <div>
                                                                            <span className="fw-bold">#{order._id}</span>
                                                                            <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>{order.customerDetails.name}</p>
                                                                        </div>
                                                                        <div className="text-end">
                                                                            <span className="fw-bold">₹{order.totalAmount}</span>
                                                                            <p className="text-muted mb-0" style={{ fontSize: '0.75rem' }}>
                                                                                {new Date(order.deliveryTime).toLocaleTimeString()}
                                                                            </p>
                                                                            <p className="text-muted mb-0" style={{ color: 'green' }} > {order.status}
                                                                            </p>
                                                                        </div>
                                                                    </ListGroup.Item>
                                                                ))}
                                                            </ListGroup>
                                                        ))}
                                                    </ListGroup>
                                                ) : (
                                                    <p className="text-muted text-center py-4">No completed orders today</p>
                                                )}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Tab>
                </Tabs>
            </Container>
        </div>
    );
};

export default RestaurantDashBoard;