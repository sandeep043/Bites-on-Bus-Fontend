import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { MapPin, Clock, Star, Plus, Minus, ShoppingCart, Phone, User, CreditCard } from "lucide-react";
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import { useSelector } from "react-redux";
import { loadStripe } from '@stripe/stripe-js';
import { Card, Button, Badge, Form, Container, Row, Col, ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import './OrderFlow.css';

const OrderFlow = () => {


    const navigate = useNavigate();
    const location = useLocation();
    const [currentStep, setCurrentStep] = useState('stops');
    const [selectedStop, setSelectedStop] = useState({});
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [cart, setCart] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        phone: "",
        seatNumber: ""
    });
    const [user, setUser] = useState(null);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const { pnr, PNRresponse } = location.state || {}
    const [restaurantDetails, setRestaurantDetails] = useState([]);
    const [restaurantINFO, setRestaurantINFO] = useState({});

    console.log("PNR Details:", PNRresponse);

    // Initialize Stripe
    const stripePromise = loadStripe('pk_test_51Rue31Eun4RG358LOwTZOGlJgJlQkrlayjQUXRrmWo9x408RSyn0pNX440UF3rICCZOD3Zc0xsJLaD4YF8Y8lv9Z00CX0ptN3L');


    const busStops = PNRresponse.stops || [{}];




    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                if (selectedStop) {
                    const params = {
                        stop: selectedStop.name,
                        city: selectedStop.location
                    };


                    const response = await axios.get(
                        'http://localhost:4000/api/restaurant/location',
                        { params } // Pass query params here
                    );

                    // Axios already parses JSON response
                    setRestaurantDetails(response.data);
                }
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };
        fetchRestaurants();
    }, [selectedStop])






    const restaurants = restaurantDetails.restaurants || [];
    console.log("Restaurants:", restaurants);


    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                if (selectedRestaurant) {


                    const response = await axios.get(
                        `http://localhost:4000/api/restaurant/${selectedRestaurant}`

                    );

                    // Axios already parses JSON response
                    console.log("Fetching restaurants for stop:", response);
                    setRestaurantINFO(response.data);
                }
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };
        fetchRestaurants();
    }, [selectedRestaurant])


    const menuItems = restaurantINFO.restaurant?.menu || [];
    console.log("Menu Items:", menuItems);





    const addToCart = (item) => {
        const existingItem = cart.find(cartItem => cartItem._id === item);
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem._id === item._id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const updateQuantity = (itemId, change) => {
        setCart(cart.map(item => {
            if (item._id === itemId) {
                const newQuantity = item.quantity + change;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
            }
            return item;
        }).filter(Boolean));
    };

    const getTotalAmount = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleCheckout = async () => {
        navigate('/orderpreview', {
            state: {
                PNRresponse: PNRresponse,
                customerDetails: {
                    name: customerInfo.name,
                    phone: customerInfo.phone,
                    seatNo: customerInfo.seatNumber
                },
                deliveryLocation: {
                    stop: selectedStop.name,
                    city: selectedStop.location
                },
                orderItems: cart,
                totalAmount: getTotalAmount(),
                estimatedDeliveryTime: "3:45 PM - 4:00 PM"
            }
        });
        // Reset cart after checkout


    };

    const handleAuthSuccess = (userData) => {
        setUser(userData);
        setCustomerInfo(prev => ({
            ...prev,
            name: userData.name,
            phone: userData.phone
        }));
    };

    console.log("cart info:", cart);



    return (
        <div className="order-flow-container">
            <Header />

            <Container className="order-flow-content">
                {/* Progress Header */}
                <div className="order-progress mb-5">
                    <div className="text-center mb-4">
                        <h1 className="order-title">Order for PNR: {pnr}</h1>
                        <div className="progress-steps">
                            <div className={`step ${currentStep === 'stops' ? 'active' : selectedStop ? 'completed' : ''}`}>
                                <span className="step-number">1</span>
                                <span className="step-label">Select Stop</span>
                            </div>
                            <div className={`step ${currentStep === 'restaurants' ? 'active' : selectedRestaurant ? 'completed' : ''}`}>
                                <span className="step-number">2</span>
                                <span className="step-label">Choose Restaurant</span>
                            </div>
                            <div className={`step ${currentStep === 'menu' ? 'active' : cart.length > 0 ? 'completed' : ''}`}>
                                <span className="step-number">3</span>
                                <span className="step-label">Add to Cart</span>
                            </div>
                            <div className={`step ${currentStep === 'checkout' ? 'active' : ''}`}>
                                <span className="step-number">4</span>
                                <span className="step-label">Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 1: Stop Selection */}
                {currentStep === 'stops' && (
                    <div className="stop-selection">
                        <h2 className="section-title">Select Your Bus Stop</h2>
                        {busStops.map((stop) => (
                            <Card
                                key={stop._id}
                                className={`stop-card ${selectedStop.stopID === stop._id ? 'selected' : ''}`}
                                onClick={() => setSelectedStop({ stopID: stop._id, name: stop.name, location: stop.location, estimatedArrival: stop.estimatedArrival })}
                            >
                                <Card.Body>
                                    <div className="stop-card-content">
                                        <div className="stop-info">
                                            <MapPin className="icon text-primary" />
                                            <div>
                                                <h3>{stop.name}</h3>
                                                <p>{stop.location} </p>
                                            </div>
                                        </div>
                                        <div className="stop-eta">
                                            <Clock className="icon" />
                                            <span>ETA: {stop.estimatedArrival}</span>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}

                        {selectedStop && (
                            <div className="continue-button">
                                <Button
                                    onClick={() => setCurrentStep('restaurants')}
                                    variant="primary"
                                >
                                    Continue to Restaurants
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 2: Restaurant Selection */}
                {currentStep === 'restaurants' && (
                    <div className="restaurant-selection">
                        <div className="section-header">
                            <h2 className="section-title">Choose Restaurant</h2>
                            <Button
                                variant="outline-primary"
                                onClick={() => setCurrentStep('stops')}
                            >
                                Change Stop
                            </Button>
                        </div>

                        <Row className="restaurant-grid">
                            {restaurants.map((restaurant) => (
                                <Col md={6} lg={4} key={restaurant._id}>
                                    <Card
                                        className={`restaurant-card ${selectedRestaurant === restaurant._id ? 'selected' : ''}`}
                                        onClick={() => setSelectedRestaurant(restaurant._id)}
                                    >
                                        <div className="restaurant-image"></div>
                                        <Card.Body>
                                            <div className="restaurant-header">
                                                <h3>{restaurant.name}</h3>
                                                <Badge bg="secondary">Pre-order</Badge>
                                            </div>

                                            <div className="restaurant-meta">
                                                <div>
                                                    <Star className="icon text-warning" />
                                                    <span>{restaurant.rating}</span>
                                                </div>
                                                <span>{restaurant.cuisineType}</span>
                                            </div>

                                            <div className="restaurant-details">
                                                <div>
                                                    <Clock className="icon" />
                                                    <span>{restaurant.openingHours.open}</span>
                                                </div>
                                                <div>
                                                    <MapPin className="icon" />
                                                    <span>{restaurant.isActive ? restaurant.location.stop : 'Closed'}</span>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        {selectedRestaurant && (
                            <div className="continue-button">
                                <Button
                                    onClick={() => setCurrentStep('menu')}
                                    variant="primary"
                                >
                                    View Menu
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 3: Menu */}
                {currentStep === 'menu' && (
                    <div className="menu-selection">
                        <div className="section-header">
                            <h2 className="section-title">
                                {restaurants.find(r => r.id === selectedRestaurant)?.name} Menu
                            </h2>
                            <Button
                                variant="outline-primary"
                                onClick={() => setCurrentStep('restaurants')}
                            >
                                Change Restaurant
                            </Button>
                        </div>

                        <Row>
                            {/* Menu Items */}
                            <Col lg={8} className="menu-items">
                                {menuItems.map((item) => (
                                    <Card key={item._id} className="menu-item">
                                        <Card.Body>
                                            <div className="menu-item-content">
                                                <div className="menu-item-image"></div>
                                                <div className="menu-item-details">
                                                    <h3>{item.name}</h3>
                                                    <p>{item.prepTime}</p>
                                                    <p className="price">₹{item.price}</p>
                                                </div>
                                                <Button
                                                    onClick={() => addToCart(item)}
                                                    variant="primary"
                                                >
                                                    <Plus className="icon" />
                                                    <span>Add</span>

                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Col>

                            {/* Cart */}
                            <Col lg={4} className="order-cart">
                                <Card className="cart-card">
                                    <Card.Body>
                                        <div className="cart-header">
                                            <ShoppingCart className="icon" />
                                            <h3>Your Order</h3>
                                        </div>

                                        {cart.length === 0 ? (
                                            <p className="empty-cart">Your cart is empty</p>
                                        ) : (
                                            <div className="cart-content">
                                                {cart.map((item) => (
                                                    <div key={item._id} className="cart-item">
                                                        <div className="item-info">
                                                            <h4>{item.name}</h4>
                                                            <p>₹{item.price}</p>
                                                        </div>
                                                        <div className="item-quantity">
                                                            <Button
                                                                variant="outline-secondary"
                                                                onClick={() => updateQuantity(item._id, -1)}
                                                                size="sm"
                                                            >
                                                                <Minus className="icon" />
                                                            </Button>
                                                            <span>{item.quantity}</span>
                                                            <Button
                                                                variant="outline-secondary"
                                                                onClick={() => updateQuantity(item._id, 1)}
                                                                size="sm"
                                                            >
                                                                <Plus className="icon" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}

                                                <div className="cart-total">
                                                    <div>
                                                        <span>Total:</span>
                                                        <span>₹{getTotalAmount()}</span>
                                                    </div>
                                                </div>

                                                <Button
                                                    onClick={() => setCurrentStep('checkout')}
                                                    variant="primary"
                                                    className="checkout-button"
                                                >
                                                    Proceed to Checkout
                                                </Button>
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                )}

                {/* Step 4: Checkout */}
                {currentStep === 'checkout' && (
                    <div className="checkout-section">
                        <div className="section-header">
                            <h2 className="section-title">Passenger Details</h2>
                            <Button
                                variant="outline-primary"
                                onClick={() => setCurrentStep('menu')}
                            >
                                Back to Menu
                            </Button>
                        </div>

                        <div className="checkout-content">
                            <Card className="contact-form">
                                <Card.Body>
                                    <h3>Contact Information</h3>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Full Name</Form.Label>
                                            <div className="input-with-icon">
                                                <User className="input-icon" />
                                                <Form.Control
                                                    placeholder="Enter passenger name"
                                                    value={customerInfo.name}
                                                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                                                />
                                            </div>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Phone Number</Form.Label>
                                            <div className="input-with-icon">
                                                <Phone className="input-icon" />
                                                <Form.Control
                                                    placeholder="Enter phone number"
                                                    value={customerInfo.phone}
                                                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                                                />
                                            </div>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Seat Number</Form.Label>
                                            <Form.Control
                                                placeholder="Enter seat number (e.g., 12A)"
                                                value={customerInfo.seatNumber}
                                                onChange={(e) => setCustomerInfo(prev => ({ ...prev, seatNumber: e.target.value }))}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>

                            <Card className="order-summary">
                                <Card.Body>
                                    <h3>Order Summary</h3>
                                    <div className="summary-items">
                                        {cart.map((item) => (
                                            <div key={item._id} className="summary-item">
                                                <span>{item.name} × {item.quantity}</span>
                                                <span>₹{item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                        <div className="summary-total">
                                            <span>Total Amount:</span>
                                            <span>₹{getTotalAmount()}</span>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Button
                                onClick={handleCheckout}
                                disabled={!customerInfo.name || !customerInfo.phone || !customerInfo.seatNumber || isProcessingPayment}
                                variant="primary"
                                className="payment-button"
                            >
                                {isProcessingPayment ? (
                                    <div className="processing-payment">
                                        <div className="spinner"></div>
                                        <span>Processing...</span>
                                    </div>
                                ) : (
                                    <div className="payment-content">
                                        <CreditCard className="icon" />
                                        <span>Pay ₹{getTotalAmount()}</span>
                                    </div>
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </Container>

            <Footer />
        </div>
    );
};

export default OrderFlow;