import React from 'react';
import { Card } from 'react-bootstrap';

export function OrderItems({ items, totalAmount }) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const taxes = subtotal * 0.05; // 5% tax
  const deliveryFee = 25; // Fixed delivery fee

  return (
    <Card className="p-4 shadow-sm">
      <Card.Body>
        <h2 className="h5 fw-semibold mb-4">Order Items</h2>

        <div className="d-flex flex-column gap-3">
          {items.map((item, index) => (
            <div key={item._id} className="d-flex justify-content-between align-items-center">
              <div className="flex-grow-1">
                <p className="fw-medium mb-1">{item.name}</p>
                <p className="small text-muted mb-0">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
              <div className="text-end">
                <p className="fw-medium mb-0">₹{item.quantity * item.price}</p>
              </div>
            </div>
          ))}

          <hr className="my-2" />

          <div className="d-flex flex-column gap-2">
            <div className="d-flex justify-content-between small">
              <span className="text-muted">Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between small">
              <span className="text-muted">Taxes & Fees (5%)</span>
              <span>₹{taxes.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between small">
              <span className="text-muted">Delivery Fee</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>

            <hr className="my-2" />

            <div className="d-flex justify-content-between fw-semibold h6">
              <span>Total Amount</span>
              <span className="text-primary">₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}