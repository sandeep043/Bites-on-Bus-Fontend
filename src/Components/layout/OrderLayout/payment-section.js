import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { CreditCard, Lock, Shield } from 'lucide-react';
import axios from 'axios'; // Make sure axios is imported

export function PaymentSection({ order }) {

    const [form, setForm] = useState('')
    const UserDetails = JSON.parse(localStorage.getItem("travelerData"));

    const userDetails = {
        firstname: UserDetails.user.name,
        email: UserDetails.user.email,
        mobile: UserDetails.user.phone
    };
    // console.log('user details', JSON.stringify(userDetails))
    console.log('order details', JSON.stringify(order))

    useEffect(() => {

        const formData = document.getElementById("payment_post");
        if (formData) {
            formData.submit();
        }
    }, [form]);

    const BuyNowHandler = async ({ amount, product, firstname, email, mobile, PNRresponse, customerDetails, orderItems, restaurant_id, orderTimeandDate, DeliveryLocation, user_id = UserDetails.user._id }) => {
        try {
            const data = await (await axios.post("http://localhost:4000/api/payment/get-payment", {
                amount, product, firstname, email, mobile, PNRresponse, customerDetails, orderItems, restaurant_id, orderTimeandDate, DeliveryLocation, user_id
            })).data;
            console.log(data);

            setForm(data);

        } catch (error) {
            console.log(error?.response?.data?.msg || error.message);
        }
    };



    return (
        <>
            {/* Render payment form HTML if present */}
            {form ? (
                <div dangerouslySetInnerHTML={{ __html: form }} />
            ) : (
                <Card className="p-6 shadow-card">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-success" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">Payment</h2>
                                <p className="text-sm text-muted-foreground">Secure payment via Razorpay</p>
                            </div>
                        </div>

                        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-lg font-semibold">Total Amount</span>
                                <span className="text-2xl font-bold text-primary">₹{order.totalAmount.toFixed(2)}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Including all taxes and fees</p>
                        </div>


                        <Button
                            onClick={() => BuyNowHandler({
                                PNRresponse: order.PNRresponse,
                                customerDetails: order.customerDetails,
                                orderItems: order.Orderitems,
                                restaurant_id: order.restaurant_id,
                                orderTimeandDate: order.orderTimeandDate,
                                DeliveryLocation: order.DeliveryLocation,
                                amount: order.totalAmount,
                                product: `Order #${order.pnr} `,
                                firstname: userDetails.firstname,
                                email: userDetails.email,
                                mobile: userDetails.mobile
                            })}
                            variant="primary"

                            className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300"
                            size="lg"
                        >
                            {"Proceed to Payment"}
                        </Button>


                        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Lock className="w-3 h-3" />
                                <span>256-bit SSL</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Shield className="w-3 h-3" />
                                <span>Secure Payment</span>
                            </div>
                        </div>
                    </div>
                </Card>
            )}
        </>
    );
}