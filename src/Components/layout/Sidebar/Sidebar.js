import React from 'react';
import { BarChart3, Users, Store, Truck, Home } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeView, setActiveView }) => {
    const menuItems = [
        { id: 'overview', label: 'Overview', icon: Home },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'restaurants', label: 'Restaurants', icon: Store },
        { id: 'delivery', label: 'Delivery Agents', icon: Truck },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <BarChart3 size={32} />
                    <h2>Admin</h2>
                </div>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                            onClick={() => setActiveView(item.id)}
                        >
                            <Icon size={20} />
                            <span className="nav-label">{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sidebar;