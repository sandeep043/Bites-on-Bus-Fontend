import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from './Components/pages/AboutPage/AboutPage'
import HomePage from './Components/pages/HomePage/HomePage';
import AdminDashboard from './Components/pages/AdminDashBoard/AdminDashBoard';
import RestaurantDashBoard from './Components/pages/RestaurantDashBoard/RestaurantDashBoard';
import "./App.css";
import LoginPage from './Components/pages/LoginPage/LoginPage';
import SignupPage from './Components/pages/SignupPage/SignupPage';
import DeliveryDashboard from './Components/pages/DeliveryDashBoard/DeliveryDashBoard';
import OrderPage from './Components/pages/OrderPage/OrderPage';
import OrderFlow from './Components/pages/OrderFlow/OrderFlow';
import OrderPreview from './Components/pages/OrderPreview/OrderPreview';
import StatusPage from './Components/pages/StatusPage/StatusPage';
import OrderTrackingPage from './Components/pages/OrderTrackingPage/OrderTrackingPage';
import {
  UseProtectedRoute, AdminProtectedRoute,
  DeliveryProtectedRoute,
  RestaurantProtectedRoute
} from '../src/Route/ProtectedRoute';
import MyOrdersPage from './Components/pages/MyOrdersPage/MyOrdersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/order' element={<OrderPage />} />
        <Route path='/admin-dashboard' element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } />
        <Route path='/restaurant-dashboard' element={
          <RestaurantProtectedRoute>
            <RestaurantDashBoard />
          </RestaurantProtectedRoute>
        } />
        <Route path='/delivery-dashboard' element={
          <DeliveryProtectedRoute>
            <DeliveryDashboard />
          </DeliveryProtectedRoute>
        } />
        <Route path='/orderflow' element={
          <UseProtectedRoute>
            <OrderFlow />
          </UseProtectedRoute>
        } />
        <Route path='/orderpreview' element={
          <UseProtectedRoute>
            <OrderPreview />
          </UseProtectedRoute>
        } />
        <Route path='/payment/:status/:id/:payment_id/:order_id' element={
          <UseProtectedRoute>
            <StatusPage />
          </UseProtectedRoute>
        } />
        <Route path='/order-tracking' element={
          <UseProtectedRoute>
            <OrderTrackingPage />
          </UseProtectedRoute>
        } />
        <Route path='/myorders' element={
          <UseProtectedRoute>
            <MyOrdersPage />
          </UseProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;