import React, { use, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { OrderHeader } from "../../layout/OrderLayout/order-header";
import { CustomerDetailsCard } from "../../layout/OrderLayout/customer-details";
import { DeliveryInfo } from "../../layout/OrderLayout/delivery-info";
import { OrderItems } from "../../layout/OrderLayout/order-items";
import { PaymentSection } from "../../layout/OrderLayout/payment-section";
import { OrderActions } from "../../layout/OrderLayout/order-actions";
import { OtpVerification } from "../../layout/OrderLayout/otp-verification";
import { useLocation, useNavigate } from 'react-router-dom';

// Mock order data based on MongoDB schema
// const mockOrder = {
//     _id: "674b8de5f123456789abcdef",
//     customerDetails: {
//         name: "Rajesh Kumar",
//         phone: "+91 9876543210",
//         PNR: "2A45678901",
//         seatNo: "B3-42"
//     },
//     DeliveryLocation: {
//         stop: "New Delhi Railway Station",
//         city: "New Delhi"
//     },
//     Orderitems: [
//         {
//             foodItemId: "item1",
//             foodItemName: "Veg Biryani with Raita",
//             quantity: 2,
//             unitPrice: 180,
//             itemTotal: 360
//         },
//         {
//             foodItemId: "item2",
//             foodItemName: "Chicken Tikka Masala",
//             quantity: 1,
//             unitPrice: 250,
//             itemTotal: 250
//         },
//         {
//             foodItemId: "item3",
//             foodItemName: "Fresh Fruit Salad",
//             quantity: 1,
//             unitPrice: 120,
//             itemTotal: 120
//         },
//         {
//             foodItemId: "item4",
//             foodItemName: "Masala Chai (2 cups)",
//             quantity: 1,
//             unitPrice: 60,
//             itemTotal: 60
//         }
//     ],
//     totalAmount: 815.25,
//     status: "confirmed",
//     orderTimeandDate: "2024-11-30T14:30:00.000Z",
//     isOtpVerified: false,
//     estimatedDeliveryTime: "3:45 PM - 4:00 PM"
// };

export default function OrderPreview() {
    const location = useLocation();
    const navigate = useNavigate();
    //  state: {
    //             pnr: pnr,
    //             customerDetails: {
    //                 name: customerInfo.name,
    //                 phone: customerInfo.phone,
    //                 seatNo: customerInfo.seatNumber
    //             },
    //             deliveryLocation: {
    //                 stop: selectedStop.name,
    //                 city: selectedStop.location
    //             },
    //             orderItems: cart,
    //             totalAmount: getTotalAmount(),
    //             estimatedDeliveryTime: "3:45 PM - 4:00 PM"
    //         } 

    const { PNRresponse, customerDetails, deliveryLocation, orderItems, totalAmount, estimatedDeliveryTime, restaurant_id } = location.state || {};
    const mockOrder = {
        PNRresponse: {
            PNR_ID: PNRresponse._id,
            PNR: PNRresponse.pnr
        },
        customerDetails: customerDetails,
        DeliveryLocation: deliveryLocation,
        Orderitems: orderItems,
        totalAmount: totalAmount,
        orderTimeandDate: "2024-11-30T14:30:00.000Z",
        isOtpVerified: false,
        estimatedDeliveryTime: "3:45 PM - 4:00 PM",
        restaurant_id: restaurant_id  // Default restaurant ID if not provided
    };
    const [order, setOrder] = useState(mockOrder);


    const handlePaymentSuccess = (paymentId) => {
        setOrder(prev => ({
            ...prev,
            paymentId,
            status: "preparing"
        }));
        alert(`Your order is confirmed. Payment ID: ${paymentId}`);
    };

    const handlePaymentFailure = (error) => {
        alert(`Payment Failed: ${error}`);
    };

    const handleOtpVerify = (otp) => {
        setOrder(prev => ({
            ...prev,
            isOtpVerified: true
        }));
    };

    const handleEditOrder = () => {
        alert("Redirecting to order modification page...");
        //navigate back to previous page 
        navigate(-1); // This will take the user back to the previous page

    };

    const handleCancelOrder = () => {
        setOrder(prev => ({
            ...prev,
            status: "cancelled"
        }));
        alert("Your order has been successfully cancelled.");
    };

    return (
        <div className="min-vh-100 bg-light">
            <Container className="py-5" style={{ maxWidth: '960px' }}>
                <div className="d-flex flex-column gap-4">
                    {/* Header */}
                    <OrderHeader order={order} />



                    {/* Two column layout for main content */}
                    <div className="row g-4">
                        {/* Left column - Order details */}
                        <div className="col-lg-8 d-flex flex-column gap-4">
                            {/* OTP Verification */}
                            <OtpVerification
                                isVerified={order.isOtpVerified}
                                phoneNumber={order.customerDetails.phone}
                                onVerify={handleOtpVerify}
                            />
                            <CustomerDetailsCard customerDetails={order.customerDetails} />
                            <DeliveryInfo
                                deliveryLocation={order.DeliveryLocation}
                                estimatedTime={order.estimatedDeliveryTime}
                            />
                            <OrderItems items={order.Orderitems} totalAmount={order.totalAmount} />

                        </div>

                        {/* Right column - Actions and payment */}
                        <div className="col-lg-4 d-flex flex-column gap-4">
                            <PaymentSection
                                order={order}
                            />
                            <OrderActions
                                order={order}
                                onEditOrder={handleEditOrder}
                                onCancelOrder={handleCancelOrder}
                            />
                        </div>
                    </div>

                    {/* Success message after payment */}
                    {order.paymentId && (
                        <Alert variant="success" className="text-center">
                            <h3 className="h5 fw-semibold mb-2">
                                Order Confirmed! 🎉
                            </h3>
                            <p className="mb-3">
                                Your food will be delivered to {order.DeliveryLocation.stop}
                                {order.estimatedDeliveryTime && ` between ${order.estimatedDeliveryTime}`}
                            </p>
                            <div className="small">
                                {/* <p className="mb-1"><strong>Order ID:</strong> #{order._id.slice(-8).toUpperCase()}</p> */}
                                <p className="mb-0"><strong>Payment ID:</strong> {order.paymentId}</p>
                            </div>
                        </Alert>
                    )}
                </div>
            </Container>
        </div>
    );
}