import React from "react";
import { Card } from "react-bootstrap";
import { User, Store, Truck, Users } from "lucide-react";
import "./RoleSelection.css";

const RoleSelection = ({ onRoleSelect, selectedRole }) => {
    const roles = [
        {
            id: 'traveler',
            title: 'Traveler',
            description: 'Order food during your bus journey',
            icon: User,
            color: 'bg-primary',
        },
        {
            id: 'restaurant',
            title: 'Restaurant Owner',
            description: 'Manage your restaurant and orders',
            icon: Store,
            color: 'bg-secondary',
        },
        {
            id: 'delivery',
            title: 'Delivery Agent',
            description: 'Deliver food to bus passengers',
            icon: Truck,
            color: 'bg-accent',
        },
        {
            id: 'admin',
            title: 'Admin',
            description: 'Platform administration',
            icon: Users,
            color: 'bg-muted-foreground',
        },
    ];

    return (
        <div>
            <div>
                <h2 className="role-selection-title">Who are you?</h2>
                <p className="role-selection-subtitle">Select your role to continue</p>
            </div>

            <div className="roles-grid">
                {roles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = selectedRole === role.id;

                    return (
                        <Card
                            key={role.id}
                            className={`role-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => onRoleSelect(role.id)}
                        >
                            <div className="text-center">
                                <div className={`role-icon-container ${role.color}`}>
                                    <Icon className="role-icon" />
                                </div>
                                <div>
                                    <h3 className="role-title">{role.title}</h3>
                                    <p className="role-description">{role.description}</p>
                                </div>
                                {isSelected && (
                                    <div className="role-selected-indicator">
                                        <div className="role-selected-dot"></div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default RoleSelection;