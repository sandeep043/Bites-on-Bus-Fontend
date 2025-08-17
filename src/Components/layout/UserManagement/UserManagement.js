import React, { useState } from 'react';
import { Search, Filter, UserCheck, UserX, MoreVertical, Mail, Phone } from 'lucide-react';
import { useEffect } from 'react';
import axios from 'axios';
// import { API_URL, token } from '../../../config';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import './UserManagement.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './UserManagement.css';

const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const token = localStorage.getItem('token');

    const users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@email.com',
            phone: '+1234567890',
            role: 'customer',
            status: 'active',
            joinDate: '2024-01-15',
            orders: 23
        },
        {
            id: 2,
            name: 'Sarah Wilson',
            email: 'sarah.wilson@email.com',
            phone: '+1234567891',
            role: 'restaurant_owner',
            status: 'active',
            joinDate: '2024-01-10',
            restaurant: 'Pizza Palace'
        },
        {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike.johnson@email.com',
            phone: '+1234567892',
            role: 'delivery_agent',
            status: 'active',
            joinDate: '2024-01-20',
            vehicle: 'Motorcycle'
        },
        {
            id: 4,
            name: 'Emily Davis',
            email: 'emily.davis@email.com',
            phone: '+1234567893',
            role: 'customer',
            status: 'inactive',
            joinDate: '2024-01-05',
            orders: 8
        },
        {
            id: 5,
            name: 'Robert Brown',
            email: 'robert.brown@email.com',
            phone: '+1234567894',
            role: 'restaurant_owner',
            status: 'pending',
            joinDate: '2024-01-25',
            restaurant: 'Burger House'
        }
    ];

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesFilter;
    });

    const getRoleColor = (role) => {
        switch (role) {
            case 'customer': return 'blue';
            case 'restaurant_owner': return 'green';
            case 'delivery_agent': return 'purple';
            default: return 'gray';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'green';
            case 'inactive': return 'red';
            case 'pending': return 'yellow';
            default: return 'gray';
        }
    };

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:4000/api/user/getall', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
            } catch (err) {
                console.error('Error fetching users:', err);
                toast.error('Failed to fetch users. Please try again later.');
            }
        }
        fetchUsers();
    }, [token]);

    return (
        <div className="user-management">
            <div className="page-header">
                <h1>User Management</h1>
                <p>Manage all users across your platform</p>
            </div>

            <div className="controls">
                <div className="search-box">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-box">
                    <Filter size={20} />
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                    >
                        <option value="all">All Roles</option>
                        <option value="customer">Customers</option>
                        <option value="restaurant_owner">Restaurant Owners</option>
                        <option value="delivery_agent">Delivery Agents</option>
                    </select>
                </div>
            </div>

            <div className="user-table-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Contact</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Details</th>
                            <th>Join Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <div className="user-info">
                                        <div className="user-avatar">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="user-name">{user.name}</div>
                                            <div className="user-id">ID: {user.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="contact-info">
                                        <div className="contact-item">
                                            <Mail size={14} />
                                            <span>{user.email}</span>
                                        </div>
                                        <div className="contact-item">
                                            <Phone size={14} />
                                            <span>{user.phone}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`role-badge ${getRoleColor(user.role)}`}>
                                        {user.role.replace('_', ' ').toUpperCase()}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status-badge ${getStatusColor(user.status)}`}>
                                        {user.status.toUpperCase()}
                                    </span>
                                </td>
                                <td>
                                    <div className="user-details">
                                        {user.orders && <span>Orders: {user.orders}</span>}
                                        {user.restaurant && <span>Restaurant: {user.restaurant}</span>}
                                        {user.vehicle && <span>Vehicle: {user.vehicle}</span>}
                                    </div>
                                </td>
                                <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="action-btn approve" title="Approve">
                                            <UserCheck size={16} />
                                        </button>
                                        <button className="action-btn suspend" title="Suspend">
                                            <UserX size={16} />
                                        </button>
                                        <button className="action-btn more" title="More options">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="table-footer">
                <p>Showing {filteredUsers.length} of {users.length} users</p>
            </div>
        </div>
    );
};

export default UserManagement;