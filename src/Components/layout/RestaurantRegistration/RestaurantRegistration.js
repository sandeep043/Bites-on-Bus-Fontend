import React, { useEffect, useState } from 'react';
import { Store, User, MapPin, Phone, Mail, Clock, DollarSign, Star, X } from 'lucide-react';
import './RestaurantRegistration.css';
import axios from 'axios';

const RestaurantRegistration = () => {
    const [activeTab, setActiveTab] = useState('register');
    const [editRestaurantData, setEditRestaurantData] = useState(null);
    const [registeredRestaurants, setRegisteredRestaurants] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
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
        stop: '',
        city: '',
        contactNumber: '',
        email: '',
        open: '',
        close: '',
    });

    const token = JSON.parse(localStorage.getItem('adminData'))?.token;

    const handleOwnerChange = (e) => {
        setOwnerForm({ ...ownerForm, [e.target.name]: e.target.value });
    };

    const handleRestaurantChange = (e) => {
        setRestaurantForm({ ...restaurantForm, [e.target.name]: e.target.value });
    };

    const RegisterOwnerAndRestaurant = async (ownerData, restaurantData) => {
        try {
            setLoading(true);
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
                stop: '',
                city: '',
                contactNumber: '',
                email: '',
                open: '',
                close: ''
            });
        }
        catch (error) {
            console.error('Error registering owner and restaurant:', error);
            alert('Error registering restaurant: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        RegisterOwnerAndRestaurant(ownerForm, restaurantForm);
    };

    const handleRestaurantEdit = (restaurant) => {
        setEditRestaurantData({
            _id: restaurant._id,
            name: restaurant.name,
            RestaurantURL: restaurant.RestaurantURL || '',
            cuisineType: restaurant.cuisineType,
            location: restaurant.location || { stop: '', city: '' },
            contactNumber: restaurant.contactNumber,
            openingHours: restaurant.openingHours || { open: '', close: '' },
            isActive: restaurant.isActive
        });
        setIsEditing(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('location.')) {
            const field = name.split('.')[1];
            setEditRestaurantData({
                ...editRestaurantData,
                location: {
                    ...editRestaurantData.location,
                    [field]: value
                }
            });
        } else if (name.startsWith('openingHours.')) {
            const field = name.split('.')[1];
            setEditRestaurantData({
                ...editRestaurantData,
                openingHours: {
                    ...editRestaurantData.openingHours,
                    [field]: value
                }
            });
        } else {
            setEditRestaurantData({
                ...editRestaurantData,
                [name]: value
            });
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.put(
                `http://localhost:4000/api/restaurant/update/${editRestaurantData._id}`,
                editRestaurantData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log('Update response:', response.data);
            alert('Restaurant updated successfully!');

            // Refresh the restaurant list
            const restaurants = await getAllrestaurantsRegistered();
            setRegisteredRestaurants(restaurants.restaurants || []);

            setIsEditing(false);
            setEditRestaurantData(null);
        } catch (error) {
            console.error('Error updating restaurant:', error);
            alert('Failed to update restaurant: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleRestaurantDelete = async (ownerId) => {
        if (!window.confirm('Are you sure you want to delete this restaurant?')) {
            return;
        }

        try {
            setLoading(true);
            const response = await axios.delete(`http://localhost:4000/api/admin/owner/${ownerId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('Restaurant removed successfully!');

            // Refresh the restaurant list
            const restaurants = await getAllrestaurantsRegistered();
            setRegisteredRestaurants(restaurants.restaurants || []);
        } catch (error) {
            console.error('Error deleting restaurant:', error);
            alert('Failed to remove restaurant: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
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
            return response.data;
        } catch (error) {
            console.error('Error fetching registered restaurants:', error);
            alert('Error fetching restaurants: ' + (error.response?.data?.message || error.message));
            return { restaurants: [] };
        }
    };

    useEffect(() => {
        const fetchRestaurants = async () => {
            setLoading(true);
            const restaurants = await getAllrestaurantsRegistered();
            setRegisteredRestaurants(restaurants.restaurants || []);
            setLoading(false);
        };
        fetchRestaurants();
    }, [activeTab]);

    return (
        <div className="restaurant-registration">
            <div className="page-header">
                <h1>Restaurant Management</h1>
                <p>Register new restaurants and manage existing ones</p>
            </div>

            {loading && <div className="loading-overlay">Loading...</div>}

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
                                        <label>Govt ID</label>
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
                                        <label>Password</label>
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
                                            placeholder="Enter Restaurant ImageURL"
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
                                            value={restaurantForm.stop}
                                            onChange={handleRestaurantChange}
                                            placeholder="Enter Stop Name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={restaurantForm.city}
                                            onChange={handleRestaurantChange}
                                            placeholder="Enter City"
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
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Registering...' : 'Register Restaurant'}
                            </button>
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
                        </div>
                    </div>

                    {registeredRestaurants.length === 0 ? (
                        <p className="no-restaurants">No restaurants found.</p>
                    ) : (
                        <div className="restaurant-cards">
                            {registeredRestaurants.map(restaurant => (
                                <div key={restaurant._id} className="restaurant-card">
                                    <div className="card-header">
                                        <h3>{restaurant.name}</h3>
                                        {restaurant.isActive ? (
                                            <span className="status-badge active">Active</span>
                                        ) : (
                                            <span className="status-badge pending">Pending</span>
                                        )}
                                    </div>

                                    <div className="card-info">
                                        <p><strong>Cuisine:</strong> {restaurant.cuisineType}</p>
                                        <p><strong>Location:</strong> {restaurant.location?.stop}, {restaurant.location?.city}</p>
                                        <p><strong>Hours:</strong> {restaurant.openingHours?.open} - {restaurant.openingHours?.close}</p>
                                        <div className="restaurant-stats">
                                            <div className="stat">
                                                <span>{restaurant.contactNumber}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-actions">

                                        <button
                                            className="btn-primary"
                                            onClick={() => handleRestaurantEdit(restaurant)}
                                            disabled={loading}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleRestaurantDelete(restaurant.owner?._id)}
                                            className="btn btn-danger"
                                            disabled={loading}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {isEditing && (
                <div className="modal-overlay">
                    <div className="edit-modal">
                        <div className="modal-header">
                            <h2>Edit Restaurant</h2>
                            <button className="close-btn" onClick={() => setIsEditing(false)} disabled={loading}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="modal-content">
                            <form onSubmit={handleEditSubmit}>
                                <div className="form-group">
                                    <label>Restaurant Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editRestaurantData?.name || ''}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Restaurant URL</label>
                                    <input
                                        type="text"
                                        name="RestaurantURL"
                                        value={editRestaurantData?.RestaurantURL || ''}
                                        onChange={handleEditChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Cuisine Type</label>
                                    <select
                                        name="cuisineType"
                                        value={editRestaurantData?.cuisineType || ''}
                                        onChange={handleEditChange}
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
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        value={editRestaurantData?.contactNumber || ''}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Stop Name</label>
                                    <input
                                        type="text"
                                        name="location.stop"
                                        value={editRestaurantData?.location?.stop || ''}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="location.city"
                                        value={editRestaurantData?.location?.city || ''}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Opening Time</label>
                                    <input
                                        type="time"
                                        name="openingHours.open"
                                        value={editRestaurantData?.openingHours?.open || ''}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Closing Time</label>
                                    <input
                                        type="time"
                                        name="openingHours.close"
                                        value={editRestaurantData?.openingHours?.close || ''}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        name="isActive"
                                        value={editRestaurantData?.isActive || false}
                                        onChange={handleEditChange}
                                    >
                                        <option value={true}>Active</option>
                                        <option value={false}>Inactive</option>
                                    </select>
                                </div>

                                <div className="form-actions">
                                    <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)} disabled={loading}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-primary" disabled={loading}>
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RestaurantRegistration;