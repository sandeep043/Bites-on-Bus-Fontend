import React, { useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { CreditCard, Lock, Shield } from 'lucide-react';

export function PaymentSection({ order, onPaymentSuccess, onPaymentFailure }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const canMakePayment = order.status === 'pending' || order.status === 'confirmed';

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setIsProcessing(true);

        try {
            const razorpayLoaded = await initializeRazorpay();

            if (!razorpayLoaded) {
                throw new Error("Failed to load Razorpay");
            }

            const razorpayOrderId = `order_${Date.now()}`;

            const options = {
                key: "rzp_test_owkEIVI61mbrYJ",
                amount: order.totalAmount * 100,
                currency: "INR",
                name: "TrainFood Express",
                description: `Order 1`,
                order_id: razorpayOrderId,
                handler: (response) => {
                    alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                    onPaymentSuccess(response.razorpay_payment_id);
                },
                prefill: {
                    name: order.customerDetails.name,
                    email: "customer@example.com",
                    contact: order.customerDetails.phone,
                },
                theme: {
                    color: "#54b82dff", // Bootstrap primary color
                },
            };

            const razorpay = new window.Razorpay(options);

            razorpay.on("payment.failed", (response) => {
                onPaymentFailure(response.error.description || "Payment failed");
                alert(`Payment Failed: ${response.error.description || "Please try again"}`);
            });

            razorpay.open();
        } catch (error) {
            console.error("Payment initialization failed:", error);
            onPaymentFailure("Failed to initialize payment");
            alert("Payment Error: Failed to initialize payment. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Card className="p-4 shadow-sm">
            <Card.Body>
                <div className="d-flex flex-column gap-3">
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center"
                            style={{ width: '40px', height: '40px' }}>
                            <CreditCard className="text-success" style={{ width: '20px', height: '20px' }} />
                        </div>
                        <div>
                            <h2 className="h5 fw-semibold mb-0">Payment</h2>
                            <p className="small text-muted mb-0">Secure payment via Razorpay</p>
                        </div>
                    </div>

                    <div className="bg-primary bg-opacity-5 p-3 rounded border border-primary border-opacity-20">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="h5 fw-semibold">Total Amount</span>
                            <span className="h4 fw-bold text-primary">₹{order.totalAmount.toFixed(2)}</span>
                        </div>
                        <p className="small text-muted mb-0">Including all taxes and fees</p>
                    </div>

                    {canMakePayment ? (
                        <Button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            variant="primary"
                            size="lg"
                            className="w-100 py-3"
                        >
                            {isProcessing ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                                    Processing...
                                </>
                            ) : "Proceed to Payment"}
                        </Button>
                    ) : (
                        <div className="text-center p-3 bg-light rounded">
                            <p className="small text-muted mb-0">
                                {order.paymentId ? "Payment completed" : "Payment not available for current order status"}
                            </p>
                        </div>
                    )}

                    <div className="d-flex justify-content-center align-items-center gap-4 small text-muted">
                        <div className="d-flex align-items-center gap-1">
                            <Lock style={{ width: '12px', height: '12px' }} />
                            <span>256-bit SSL</span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <Shield style={{ width: '12px', height: '12px' }} />
                            <span>Secure Payment</span>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}