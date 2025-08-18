import React, { useEffect, useState } from 'react';
import { Store, User, MapPin, Phone, Mail, Clock, DollarSign, Star } from 'lucide-react';
import './RestaurantRegistration.css';
import axios from 'axios';

const RestaurantRegistration = () => {
    const [activeTab, setActiveTab] = useState('register');
    const [registeredRestaurants, setRegisteredRestaurants] = useState([]);
    const [ownerForm, setOwnerForm] = useState({
        name: '',
        email: '',
        phone: '',
        govtId: '',
        password: ''

    });

    const [restaurantForm, setRestaurantForm] = useState({
        name: '',
        cuisine: '',
        location: {},
        contactNumber: '',
        email: '',
        open: '',
        close: '',
    });
    const token = JSON.parse(localStorage.getItem('adminData'))?.token;
    console.log('token in restaurantRegistration', token);


    const handleOwnerChange = (e) => {
        setOwnerForm({ ...ownerForm, [e.target.name]: e.target.value });
    };

    const handleRestaurantChange = (e) => {
        setRestaurantForm({ ...restaurantForm, [e.target.name]: e.target.value });
    };


    const RegisterOwnerAndRestaurant = async (ownerData, restaurantData) => {
        try {

            // {
            //     "name": "Mahesh Kumar",
            //         "email": "mahesh.owner@example.com",
            //             "phone": "9876543210",
            //                 "password": "mahesh@123",
            //                     "govtId": "ID123456",
            //                         "restaurant": {
            //         "name": "Mahesh's Diner",
            //             "cuisineType": "Indian",
            //                 "location": "Downtown",
            //         "contactNumber": "9876543210",
            //             "openingHours": {
            //             "open": "08:00",
            //                 "close": "22:00"
            //         },
            //         "menu": [
            //             {
            //                 "itemId": "1",
            //                 "name": "Paneer Butter Masala",
            //                 "price": 180,
            //                 "prepTime": 20,
            //                 "dietaryTags": ["vegetarian"],
            //                 "isAvailable": true
            //             }
            //         ]
            //     }
            // } 
            const payload = {
                name: ownerForm.name,
                email: ownerForm.email,
                phone: ownerForm.phone,
                password: ownerForm.password,
                govtId: ownerForm.govtId,
                restaurant: {
                    name: restaurantForm.name,
                    cuisineType: restaurantForm.cuisine,
                    location: {
                        stop: restaurantForm.stop,
                        city: restaurantForm.city

                    },
                    contactNumber: restaurantForm.contactNumber,
                    openingHours: {
                        open: restaurantForm.open,
                        close: restaurantForm.close
                    }

                }
            };

            const response = await axios.post(
                "http://localhost:4000/api/admin/register-owner",
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.data);
            alert('Restaurant and owner registered successfully!');
            setOwnerForm({
                name: '',
                email: '',
                phone: '',
                govtId: '',
                password: ''
            });
            setRestaurantForm({
                name: '',
                cuisine: '',
                location: '',
                contactNumber: '',
                email: '',
                open: '',
                close: ''

            });




        }
        catch (error) {
            console.error('Error registering owner and restaurant:', error);
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        RegisterOwnerAndRestaurant(ownerForm, restaurantForm);


    };


    const getAllrestaurantsRegistered = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/admin/restaurants", {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.error('Error fetching registered restaurants:', error);

        }
    };

    useEffect(() => {
        const fetchRestaurants = async () => {
            const restaurants = await getAllrestaurantsRegistered();
            setRegisteredRestaurants(restaurants.restaurants
            );
        }
        fetchRestaurants();
    }, [activeTab]);

    // console.log(registeredRestaurants);
    //     {
    //   "restaurants": [
    //     {
    //       "_id": "689847740d9699bfbbf5a32b",
    //       "contactNumber": "1231231230",
    //       "cuisineType": "Italian",
    //       "isActive": true,
    //       "location": 
    //         "DOWNTOWN"
    //       ,
    //       "menu": [],
    //       "name": "kirak party",
    //       "openingHours": {
    //         "open": "10:00",
    //         "close": "23:00"
    //       },
    //       "owner": {
    //         "_id": "689847740d9699bfbbf5a328",
    //         "email": "owner5@gmail.com",
    //         "name": "owner 5",
    //         "phone": "1234567890"
    //       },
    //       "rating": 3,
    //       "__v": 0
    //     }
    //   ]
    // }




    // const registeredRestaurants = [
    //     {
    //         id: 1,
    //         name: 'Pizza Palace',
    //         owner: 'Sarah Wilson',
    //         cuisine: 'Italian',
    //         status: 'active',
    //         rating: 4.8,
    //         orders: 234,
    //         revenue: '$12,450'
    //     },
    //     {
    //         id: 2,
    //         name: 'Burger House',
    //         owner: 'Robert Brown',
    //         cuisine: 'American',
    //         status: 'pending',
    //         rating: 4.6,
    //         orders: 156,
    //         revenue: '$8,920'
    //     },
    //     {
    //         id: 3,
    //         name: 'Sushi Station',
    //         owner: 'David Lee',
    //         cuisine: 'Japanese',
    //         status: 'active',
    //         rating: 4.9,
    //         orders: 189,
    //         revenue: '$15,630'
    //     }
    // ];

    return (
        <div className="restaurant-registration">
            <div className="page-header">
                <h1>Restaurant Management</h1>
                <p>Register new restaurants and manage existing ones</p>
            </div>

            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'register' ? 'active' : ''}`}
                    onClick={() => setActiveTab('register')}
                >
                    <Store size={20} />
                    Register Restaurant
                </button>
                <button
                    className={`tab ${activeTab === 'list' ? 'active' : ''}`}
                    onClick={() => setActiveTab('list')}
                >
                    <Store size={20} />
                    Restaurant List
                </button>
            </div>

            {activeTab === 'register' && (
                <div className="registration-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-sections">
                            <div className="form-section">
                                <div className="section-header">
                                    <User size={24} />
                                    <h2>Owner Information</h2>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={ownerForm.name}
                                            onChange={handleOwnerChange}
                                            placeholder="Enter owner's full name"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Email</label>
                                        <div className="input-with-icon">
                                            <Mail size={18} />
                                            <input
                                                type="email"
                                                name="email"
                                                value={ownerForm.email}
                                                onChange={handleOwnerChange}
                                                placeholder="Enter email address"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Phone</label>
                                        <div className="input-with-icon">
                                            <Phone size={18} />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={ownerForm.phone}
                                                onChange={handleOwnerChange}
                                                placeholder="Enter phone number"
                                                required
                                            />
                                        </div>
                                    </div>



                                    <div className="form-group">
                                        <label>govtId</label>
                                        <input
                                            type="text"
                                            name="govtId"
                                            value={ownerForm.govtId}
                                            onChange={handleOwnerChange}
                                            placeholder="Enter govtId"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={ownerForm.password}
                                            onChange={handleOwnerChange}
                                            placeholder="Enter password"
                                            required
                                        />
                                    </div>


                                </div>
                            </div>

                            <div className="form-section">
                                <div className="section-header">
                                    <Store size={24} />
                                    <h2>Restaurant Information</h2>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group full-width">
                                        <label>Restaurant Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={restaurantForm.name}
                                            onChange={handleRestaurantChange}
                                            placeholder="Enter restaurant name"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Cuisine Type</label>
                                        <select
                                            name="cuisine"
                                            value={restaurantForm.cuisine}
                                            onChange={handleRestaurantChange}
                                            required
                                        >
                                            <option value="">Select cuisine</option>
                                            <option value="Italian">Italian</option>
                                            <option value="Chinese">Chinese</option>
                                            <option value="Indian">Indian</option>
                                            <option value="Mexican">Mexican</option>
                                            <option value="American">American</option>
                                            <option value="Japanese">Japanese</option>
                                            <option value="Thai">Thai</option>
                                            <option value="Mediterranean">Mediterranean</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Contact Number</label>
                                        <div className="input-with-icon">
                                            <Phone size={18} />
                                            <input
                                                type="tel"
                                                name="contactNumber"
                                                value={restaurantForm.contactNumber}
                                                onChange={handleRestaurantChange}
                                                placeholder="Enter restaurant Number"
                                                required
                                            />
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label>Stop Name</label>
                                        <input
                                            type="text"
                                            name="stop"
                                            value={restaurantForm.location.stop}
                                            onChange={handleRestaurantChange}
                                            placeholder="Enter Stop Name"
                                            step="any"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={restaurantForm.location.city}
                                            onChange={handleRestaurantChange}
                                            placeholder="Enter City"
                                            step="any"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Opening Hours</label>
                                        <div className="input-with-icon">
                                            <Clock size={18} />
                                            <input
                                                type="time"
                                                name="open"
                                                value={restaurantForm.open}
                                                onChange={handleRestaurantChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Closing Hours</label>
                                        <div className="input-with-icon">
                                            <Clock size={18} />
                                            <input
                                                type="time"
                                                name="close"
                                                value={restaurantForm.close}
                                                onChange={handleRestaurantChange}
                                                required
                                            />
                                        </div>
                                    </div>




                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-secondary">Cancel</button>
                            <button type="submit" className="btn-primary">Register Restaurant</button>
                        </div>
                    </form>
                </div>
            )}

            {activeTab === 'list' && (
                <div className="restaurant-list">
                    <div className="list-header">
                        <h2>Registered Restaurants</h2>
                        <div className="stats">
                            <span className="stat-item">Total: {registeredRestaurants.length}</span>
                            {/* <span className="stat-item">Active: {registeredRestaurants.filter(r => r.status === 'active').length}</span>
                            <span className="stat-item">Pending: {registeredRestaurants.filter(r => r.status === 'pending').length}</span> */}
                        </div>
                    </div>

                    <div className="restaurant-cards">
                        {registeredRestaurants.map(restaurant => (
                            <div key={restaurant._id} className="restaurant-card">
                                <div className="card-header">
                                    <h3>{restaurant.name}</h3>
                                    {/* <span className={`status-badge ${restaurant.status}`}>
                                        {restaurant.status.toUpperCase()}
                                    </span> */}
                                    {restaurant.isActive ? (
                                        <span className="status-badge active">Active</span>
                                    ) : (
                                        <span className="status-badge pending">Pending</span>
                                    )}
                                </div>

                                <div className="card-info">
                                    {/* <p><strong>Owner:</strong> {restaurant.owner.name}</p> */}
                                    <p><strong>Cuisine:</strong> {restaurant.cuisineType}</p>

                                    <div className="restaurant-stats">
                                        {/* <div className="stat">
                                            <Star size={16} />
                                            <span>{restaurant.rating}</span>
                                        </div> */}
                                        {/* <div className="stat">
                                            <span>{restaurant.orders} Orders</span>
                                        </div> */}
                                        <div className="stat">
                                            <span>{restaurant.contactNumber} Phone</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-actions">
                                    <button className="btn-outline">View Details</button>
                                    <button className="btn-primary">Edit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RestaurantRegistration;