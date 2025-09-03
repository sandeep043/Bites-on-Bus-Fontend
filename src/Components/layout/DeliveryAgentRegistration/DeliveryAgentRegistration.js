import React, { useState } from 'react';
import { Truck, User, Phone, Mail, MapPin, Car, Bike, AlertCircle, X } from 'lucide-react';
import axios from 'axios';
import { useEffect } from 'react';
import './DeliveryAgentRegistration.css';

const DeliveryAgentRegistration = () => {
    const [activeTab, setActiveTab] = useState('register');
    const [editDeliveryAgentData, setEditDeliveryAgentData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [deliveryAgents, setDeliveryAgents] = useState([]);
    const [loading, setLoading] = useState(false);
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



    const handleEditChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('zone.')) {
            const field = name.split('.')[1];
            setEditDeliveryAgentData({
                ...editDeliveryAgentData,
                zone: {
                    ...editDeliveryAgentData.zone,
                    [field]: value
                }
            });

        } else {
            setEditDeliveryAgentData({
                ...editDeliveryAgentData,
                [name]: value
            });
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

    const handleDeliveryAgentEdit = (agent) => {
        setEditDeliveryAgentData({
            _id: agent._id,
            name: agent.name,
            phone: agent.phone || '',
            zone: { stop: agent.zone.stop, city: agent.zone.city || '' } || { stop: '', city: '' },
            vehicleType: agent.vehicleType || '',
        });
        setIsEditing(true);
    };
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.put(
                `http://localhost:4000/api/agent/update/${editDeliveryAgentData._id}`,
                editDeliveryAgentData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log('Update response:', response.data);
            alert('Agent updated successfully!');

            // Refresh the agent list  
            const agents = await getDeliveryAgents();
            setDeliveryAgents(agents.data);


            setIsEditing(false);
            setEditDeliveryAgentData(null);
        } catch (error) {
            console.error('Error updating restaurant:', error);
            alert('Failed to update restaurant: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };
    const handleAgentDelete = async (agentId) => {
        if (!window.confirm('Are you sure you want to delete this restaurant?')) {
            return;
        }

        try {
            setLoading(true);
            const response = await axios.delete(`http://localhost:4000/api/admin/agent/${agentId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('Agent removed successfully!');

            // Refresh the restaurant list
            const agents = await getDeliveryAgents();
            setDeliveryAgents(agents.data);
        } catch (error) {
            console.error('Error deleting agent:', error);

        } finally {
            setLoading(false);
        }
    };


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

                                    <div className="card-actions">
                                        <button
                                            className="btn-primary"
                                            onClick={() => handleDeliveryAgentEdit(agent)}
                                            disabled={loading}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleAgentDelete(agent._id)}
                                            className="btn btn-danger"
                                            disabled={loading}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {isEditing && (
                <div className="modal-overlay">
                    <div className="edit-modal">
                        <div className="modal-header">
                            <h2>Edit Delivery Agent</h2>
                            <button className="close-btn" onClick={() => setIsEditing(false)} disabled={loading}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="modal-content">
                            <form onSubmit={handleEditSubmit}>
                                <div className="form-group">
                                    <label>Agent Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editDeliveryAgentData?.name || ''}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="number"
                                        name="phone"
                                        value={editDeliveryAgentData?.phone || ''}
                                        onChange={handleEditChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Vehicle Type</label>
                                    <select
                                        name="vehicleType"
                                        value={editDeliveryAgentData?.vehicleType || ''}
                                        onChange={handleEditChange}
                                        required
                                    >
                                        <option value="">Select Vehicle Type</option>
                                        <option value="Motorcycle">Motorcycle</option>
                                        <option value="Scooter">Scooter</option>
                                        <option value="eBike">eBike</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Stop </label>
                                    <input
                                        type="text"
                                        name="zone.stop"
                                        value={editDeliveryAgentData?.zone?.stop || ''}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="zone.city"
                                        value={editDeliveryAgentData?.zone?.city || ''}
                                        onChange={handleEditChange}
                                        required
                                    />
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

export default DeliveryAgentRegistration;