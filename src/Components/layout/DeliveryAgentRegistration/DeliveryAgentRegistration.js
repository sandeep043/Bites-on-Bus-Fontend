import React, { useState } from 'react';
import { Truck, User, Phone, Mail, MapPin, Car, Bike, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useEffect } from 'react';
import './DeliveryAgentRegistration.css';

const DeliveryAgentRegistration = () => {
    const [activeTab, setActiveTab] = useState('register');
    const [deliveryAgents, setDeliveryAgents] = useState([]);
    const [agentForm, setAgentForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        idNumber: '',
        vehicleType: '',
        licensePlate: '',
        stop: '',
        city: '',

    });
    const token = JSON.parse(localStorage.getItem('adminData'))?.token;
    console.log('token in deliveryAgentRegistration', token);

    const handleChange = (e) => {
        setAgentForm({ ...agentForm, [e.target.name]: e.target.value });
    };
    const RegisterAgent = async (agentData) => {
        try {
            const payload = {
                name: agentData.name,
                email: agentData.email,
                phone: agentData.phone,
                password: agentData.password,
                idNumber: agentData.idNumber,
                vehicleType: agentData.vehicleType,
                licensePlate: agentData.licensePlate,
                zone: { stop: agentData.stop, city: agentData.city }

            };



            const response = await axios.post(
                "http://localhost:4000/api/admin/register-agent",
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;


        } catch (error) {
            console.error(error.response.data);



        }
    };



    const getDeliveryAgents = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/admin/agents/details', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };








    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await RegisterAgent(agentForm);
        console.log(response);
        alert('Delivery agent registered successfully!');

    };

    useEffect(() => {
        const fetchRestaurants = async () => {
            const agents = await getDeliveryAgents();
            setDeliveryAgents(agents.data
            );
        }
        fetchRestaurants();
    }, [activeTab]);


    // const deliveryAgents = [
    //     {
    //         id: 1,
    //         name: 'Mike Johnson',
    //         phone: '+1234567890',
    //         vehicle: 'Motorcycle',
    //         zone: 'Downtown',
    //         status: 'active',
    //         rating: 4.8,
    //         deliveries: 342,
    //         earnings: '$2,840'
    //     },
    //     {
    //         id: 2,
    //         name: 'Lisa Chen',
    //         phone: '+1234567891',
    //         vehicle: 'Bicycle',
    //         zone: 'University Area',
    //         status: 'active',
    //         rating: 4.9,
    //         deliveries: 289,
    //         earnings: '$2,156'
    //     },
    //     {
    //         id: 3,
    //         name: 'David Rodriguez',
    //         phone: '+1234567892',
    //         vehicle: 'Car',
    //         zone: 'Suburbs',
    //         status: 'pending',
    //         rating: 4.7,
    //         deliveries: 156,
    //         earnings: '$1,432'
    //     }
    // ];

    const getVehicleIcon = (vehicle) => {
        switch (vehicle) {
            case 'Motorcycle':
                return Bike;
            case 'car':
                return Car;
            case 'Scooter':
                return Bike;
            case 'eBike':
                return Bike;
            default:
                return Truck;
        }
    };

    return (
        <div className="delivery-agent-registration">
            <div className="page-header">
                <h1>Delivery Agent Management</h1>
                <p>Register and manage delivery agents for your platform</p>
            </div>

            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'register' ? 'active' : ''}`}
                    onClick={() => setActiveTab('register')}
                >
                    <User size={20} />
                    Register Agent
                </button>
                <button
                    className={`tab ${activeTab === 'list' ? 'active' : ''}`}
                    onClick={() => setActiveTab('list')}
                >
                    <Truck size={20} />
                    Agent List
                </button>
            </div>

            {activeTab === 'register' && (
                <div className="registration-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-sections">
                            <div className="form-section">
                                <div className="section-header">
                                    <User size={24} />
                                    <h2>Personal Information</h2>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={agentForm.name}
                                            onChange={handleChange}
                                            placeholder="Enter full name"
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
                                                value={agentForm.email}
                                                onChange={handleChange}
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
                                                value={agentForm.phone}
                                                onChange={handleChange}
                                                placeholder="Enter phone number"
                                                required
                                            />
                                        </div>
                                    </div>



                                    <div className="form-group">
                                        <label>ID Number</label>
                                        <input
                                            type="text"
                                            name="idNumber"
                                            value={agentForm.idNumber}
                                            onChange={handleChange}
                                            placeholder="Enter ID/License number"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={agentForm.password}
                                            onChange={handleChange}
                                            placeholder="Enter password"
                                            required
                                        />
                                    </div>


                                </div>
                            </div>

                            <div className="form-section">
                                <div className="section-header">
                                    <Truck size={24} />
                                    <h2>Vehicle & Work Information</h2>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Vehicle Type</label>
                                        <select
                                            name="vehicleType"
                                            value={agentForm.vehicleType}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select vehicle type</option>
                                            <option value="motorcycle">motorcycle</option>
                                            <option value="eBike">eBike</option>
                                            <option value="Scooter">Scooter</option>
                                        </select>
                                    </div>


                                    <div className="form-group">
                                        <label>License Plate</label>
                                        <input
                                            type="text"
                                            name="licensePlate"
                                            value={agentForm.licensePlate}
                                            onChange={handleChange}
                                            placeholder="Enter license plate number"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Delivery Stop Name</label>
                                        <input
                                            type="text"
                                            name="stop"
                                            value={agentForm.stop}
                                            onChange={handleChange}
                                            placeholder="Enter license plate number"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Delivery City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={agentForm.city}
                                            onChange={handleChange}
                                            placeholder="Enter license plate number"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Bank Account Number</label>
                                        <input
                                            type="text"
                                            name="bankAccount"
                                            value={agentForm.bankAccount}
                                            onChange={handleChange}
                                            placeholder="Enter bank account number"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-notice">
                            <AlertCircle size={20} />
                            <p>All delivery agents must provide valid identification and vehicle documentation. Background verification will be conducted before approval.</p>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-secondary">Cancel</button>
                            <button type="submit" className="btn-primary">Register Agent</button>
                        </div>
                    </form>
                </div>
            )}

            {activeTab === 'list' && (
                <div className="agent-list">
                    <div className="list-header">
                        <h2>Registered Delivery Agents</h2>
                        <div className="stats">
                            <span className="stat-item">Total: {deliveryAgents.length}</span>
                            <span className="stat-item">Active: {deliveryAgents.filter(a => a.availabelity === 'online').length}</span>
                            <span className="stat-item">offline: {deliveryAgents.filter(a => a.availabelity === 'offline').length}</span>
                        </div>
                    </div>

                    <div className="agent-cards">
                        {deliveryAgents.map(agent => {
                            const VehicleIcon = getVehicleIcon(agent.vehicleType);
                            return (
                                <div key={agent._id} className="agent-card">
                                    <div className="card-header">
                                        <div className="agent-info">
                                            <div className="agent-avatar">
                                                {agent.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3>{agent.name}</h3>
                                                <p>{agent.phone}</p>
                                            </div>
                                        </div>
                                        <span className={`status-badge ${agent.status}`}>
                                            {agent.availabelity.toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="card-details">
                                        <div className="detail-item">
                                            <VehicleIcon size={16} />
                                            <span>{agent.Type}</span>
                                        </div>
                                        <div className="detail-item">
                                            <MapPin size={16} />
                                            <span>{agent.zone.stop}</span>
                                            <span>{agent.zone.city}</span>
                                        </div>
                                    </div>

                                    {/* <div className="agent-stats">
                                        <div className="stat">
                                            <span className="stat-value">{agent.rating}</span>
                                            <span className="stat-label">Rating</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-value">{agent.deliveries}</span>
                                            <span className="stat-label">Deliveries</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-value">{agent.earnings}</span>
                                            <span className="stat-label">Earnings</span>
                                        </div>
                                    </div> */}

                                    <div className="card-actions">
                                        <button className="btn-outline">View Details</button>
                                        <button className="btn-primary">Edit</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeliveryAgentRegistration;