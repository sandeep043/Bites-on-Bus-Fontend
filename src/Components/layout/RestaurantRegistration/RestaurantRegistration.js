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
        RestaurantURL: '',
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


            const payload = {
                name: ownerForm.name,
                email: ownerForm.email,
                phone: ownerForm.phone,
                password: ownerForm.password,
                govtId: ownerForm.govtId,
                restaurant: {
                    name: restaurantForm.name,
                    RestaurantURL: restaurantForm.RestaurantURL,
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
                RestaurantURL: '',
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
    const handleRestaurantDelete = async (ownerId) => {
        try {
            console.log('Deleting restaurant with owner ID:', ownerId);
            const response = await axios.delete(`http://localhost:4000/api/admin/owner/${ownerId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('Restaurant removed successfully!');
            // Refresh the restaurant list after deletion
            const updatedRestaurants = registeredRestaurants.filter(r => r.owner._id !== ownerId);
            setRegisteredRestaurants(updatedRestaurants);
        } catch (error) {
            console.error('Error deleting restaurant:', error);
            alert('Failed to remove restaurant.');
        }
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
                                    <div className="form-group full-width">
                                        <label>Restaurant URL</label>
                                        <input
                                            type="text"
                                            name="RestaurantURL"
                                            value={restaurantForm.RestaurantURL}
                                            onChange={handleRestaurantChange}
                                            placeholder="Enter  Restaurant ImageURL"
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
                                    <button className="btn btn-outline">View Details</button>
                                    <button className="btn-primary">Edit</button>
                                    <button onClick={() => handleRestaurantDelete(restaurant.owner._id)} className=" btn btn-danger">Remove</button>
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