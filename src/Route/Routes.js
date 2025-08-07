import React from "react";
import { createBrowserRouter, RouterProvider, Navigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

import { navigationLinks } from "../utils/constants";

import PlainLayout from "../layouts/plainLayout";
import MainLayout from "../layouts/mainLayout";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import EmailOtpPage from "../pages/auth/EmailOtpPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";

import HomePage from "../pages/HomePage";
import WishlistPage from "../pages/WishlistPage";
import ProductPage from "../pages/Product/ProductPage";
import ProductDetailPage from "../pages/Product/ProductDetailPage";
import AllProductsPage from "../pages/Product/AllProductsPage";
import ChangePasswordPage from "../pages/profile/ChangePasswordPage";
import CheckoutPage from "../pages/orderPage";
import AddressPage from "../pages/address/AddressPage";
import AddressAddForm from "../components/address/AddressForm";
import UserCartPage from "../pages/UserCartPage";
import AddressList from "../components/address/AddressList";
import OrderSuccess from "../pages/OrderSuccess";

// ProtectedRoute - Redirects if user is not logged in, preserving the original route, and shows a toast
function ProtectedRoute({ children }) {
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const token = localStorage.getItem("token");

    const location = useLocation();

    if (!isAuthenticated) {
        toast.info("Please login to continue.");
        return <Navigate to={navigationLinks.login.path} replace state={{ from: location }} />;
    }

    return children;
}

// Plain routes: These are typically auth-related routes without main layout
const plainRoutes = [
    { path: navigationLinks.sendOtp.path, element: <EmailOtpPage /> },
    { path: navigationLinks.verifyOtp.path, element: <VerifyOtpPage /> },
    { path: navigationLinks.login.path, element: <LoginPage /> },      // Explicit login path
    { path: navigationLinks.register.path, element: <RegisterPage /> },
];

// Public routes: accessible without login but wrapped inside MainLayout
const publicRoutes = [
    { index: true, path: navigationLinks.home.path, element: <HomePage /> },
    { path: navigationLinks.forgotPassword.path, element: <ForgotPasswordPage /> },
    { path: navigationLinks.product.path, element: <AllProductsPage /> },
    { path: "/products/category/:categoryId", element: <ProductPage /> },
    { path: `${navigationLinks.product.path}/:productId`, element: <ProductDetailPage /> },
    { path: navigationLinks.address.path, element: <AddressPage /> },
    { path: "/addresses/add", element: <AddressAddForm /> },
    {
        path: navigationLinks.resetPassword.path,
        element: <ResetPasswordPage />,
    },
    { path: navigationLinks.cart.path, element: <UserCartPage /> },
];

// Protected routes: require login, wrapped with ProtectedRoute
const protectedRoutes = [
    { path: navigationLinks.wishlist.path, element: <WishlistPage /> },
    { path: navigationLinks.user.changePassword, element: <ChangePasswordPage /> },
    { path: navigationLinks.address.list, element: <AddressList /> },
    { path: navigationLinks.order.path, element: <CheckoutPage /> },
    { path: navigationLinks.orderSuccess.path, element: <OrderSuccess /> },  // Only here, no duplicate
];

const router = createBrowserRouter([
    {
        element: <PlainLayout />,
        children: [...plainRoutes],
    },
    {
        path: navigationLinks.home.path,  // usually "/"
        element: <MainLayout />,
        children: [
            ...publicRoutes,
            ...protectedRoutes.map((route) => ({
                ...route,
                element: <ProtectedRoute>{route.element}</ProtectedRoute>,
            })),
        ],
    },
]);

export default function Approutes() {
    return (
        <>
            <ToastContainer />
            <RouterProvider router={router} />
        </>
    );
}