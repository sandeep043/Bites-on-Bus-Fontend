import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";

function UseProtectedRoute({ children }) {
    const authObj = JSON.parse(localStorage.getItem('isTravelerAuthenticated') || '{}');
    const isAuthenticated = authObj.isAuthenticated;
    return isAuthenticated ? children : <Navigate to='/login' replace />;
}

function AdminProtectedRoute({ children }) {
    const authObj = JSON.parse(localStorage.getItem('isAdminAuthenticated') || '{}');
    const isAuthenticated = authObj.isAuthenticated;
    return isAuthenticated ? children : <Navigate to='/login' replace />;
}

function DeliveryProtectedRoute({ children }) {
    const authObj = JSON.parse(localStorage.getItem('isDeliveryAuthenticated') || '{}');
    const isAuthenticated = authObj.isAuthenticated;
    return isAuthenticated ? children : <Navigate to='/login' replace />;
}

function RestaurantProtectedRoute({ children }) {
    const authObj = JSON.parse(localStorage.getItem('isRestaurantAuthenticated') || '{}');
    const isAuthenticated = authObj.isAuthenticated;
    return isAuthenticated ? children : <Navigate to='/login' replace />;
}

export {
    UseProtectedRoute,
    AdminProtectedRoute,
    DeliveryProtectedRoute,
    RestaurantProtectedRoute
};