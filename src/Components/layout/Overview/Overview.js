import React from 'react';
import { Users, Store, Truck, ShoppingBag, TrendingUp, Clock, MapPin } from 'lucide-react';
import './Overview.css';

const Overview = () => {
    const stats = [
        {
            title: 'Total Users',
            value: '12,847',
            change: '+12.5%',
            icon: Users,
            color: 'blue'
        },
        {
            title: 'Restaurants',
            value: '423',
            change: '+8.2%',
            icon: Store,
            color: 'green'
        },
        {
            title: 'Delivery Agents',
            value: '156',
            change: '+15.3%',
            icon: Truck,
            color: 'purple'
        },
        {
            title: 'Active Orders',
            value: '89',
            change: '+23.1%',
            icon: ShoppingBag,
            color: 'orange'
        }
    ];

    const recentActivities = [
        { type: 'user', message: 'New user registered: John Doe', time: '2 minutes ago', icon: Users },
        { type: 'restaurant', message: 'Restaurant "Pizza Palace" registered', time: '15 minutes ago', icon: Store },
        { type: 'delivery', message: 'Delivery agent Mike Johnson joined', time: '1 hour ago', icon: Truck },
        { type: 'order', message: 'Order #1234 delivered successfully', time: '2 hours ago', icon: ShoppingBag }
    ];

    return (
        <div className="overview">
            <div className="overview-header">
                <h1>Dashboard Overview</h1>
                <p>Monitor your food delivery platform performance</p>
            </div>

            <div className="stats-grid">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className={`stat-card ${stat.color}`}>
                            <div className="stat-icon">
                                <Icon size={24} />
                            </div>
                            <div className="stat-content">
                                <h3>{stat.value}</h3>
                                <p>{stat.title}</p>
                                <div className="stat-change">
                                    <TrendingUp size={16} />
                                    <span>{stat.change}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="overview-content">
                <div className="recent-activity">
                    <div className="card">
                        <div className="card-header">
                            <h2>Recent Activity</h2>
                            <Clock size={20} />
                        </div>
                        <div className="activity-list">
                            {recentActivities.map((activity, index) => {
                                const Icon = activity.icon;
                                return (
                                    <div key={index} className="activity-item">
                                        <div className="activity-icon">
                                            <Icon size={18} />
                                        </div>
                                        <div className="activity-content">
                                            <p>{activity.message}</p>
                                            <span className="activity-time">{activity.time}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="quick-stats">
                    <div className="card">
                        <div className="card-header">
                            <h2>Quick Stats</h2>
                            <MapPin size={20} />
                        </div>
                        <div className="quick-stats-content">
                            <div className="stat-item">
                                <span className="stat-label">Average Delivery Time</span>
                                <span className="stat-value">28 min</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Customer Satisfaction</span>
                                <span className="stat-value">4.8/5</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Orders Today</span>
                                <span className="stat-value">342</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Revenue Today</span>
                                <span className="stat-value">$8,420</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;