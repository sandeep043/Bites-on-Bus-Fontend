import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const getDietaryTagVariant = (tag) => {
  switch (tag.toLowerCase()) {
    case 'non-veg':
      return 'danger';
    case 'veg':
      return 'success';
    case 'hot':
    case 'spicy':
      return 'warning';
    default:
      return 'secondary';
  }
};

const OrderItemsList = ({ items }) => {
  return (
    <Card className="w-100 mb-4 shadow-sm">
      <Card.Header>
        <Card.Title className="h5 mb-0">
          Order Items ({items.length})
        </Card.Title>
      </Card.Header>

      <Card.Body className="p-3">
        {items.map((item) => (
          <div
            key={item._id}
            className={`p-3 mb-3 rounded border ${item.isAvailable
                ? 'border-light bg-white hover-bg-light'
                : 'border-danger bg-danger bg-opacity-10'
              }`}
          >
            <div className="d-flex justify-content-between">
              <div className="flex-grow-1 me-3">
                <div className="d-flex align-items-center mb-2">
                  <h5 className={`mb-0 me-2 ${item.isAvailable ? '' : 'text-muted'
                    }`}>
                    {item.name}
                  </h5>
                  {item.isAvailable ? (
                    <CheckCircle className="text-success" size={16} />
                  ) : (
                    <XCircle className="text-danger" size={16} />
                  )}
                </div>

                <div className="d-flex align-items-center text-muted small mb-2">
                  <Clock className="me-1" size={14} />
                  <span className="me-2">{item.prepTime} min prep time</span>
                  <span className="me-2">•</span>
                  <span>Qty: {item.quantity}</span>
                </div>

                <div className="d-flex flex-wrap gap-1">
                  {item.dietaryTags.map((tag) => (
                    <Badge
                      key={tag}
                      bg={getDietaryTagVariant(tag)}
                      className="text-white small"
                    >
                      {tag}
                    </Badge>
                  ))}
                  <Badge
                    bg={item.isAvailable ? "success" : "danger"}
                    className="small text-white"
                  >
                    {item.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>

              <div className="text-end">
                <p className={`fw-bold mb-0 ${item.isAvailable ? '' : 'text-muted'
                  }`}>
                  ₹{item.price}
                </p>
                {item.quantity > 1 && (
                  <p className="small text-muted mb-0">
                    ₹{item.price} each
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="pt-3 border-top">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-medium">Total Amount:</span>
            <span className="h4 fw-bold mb-0">
              ₹{items.reduce((total, item) => total + (item.price * item.quantity), 0)}
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OrderItemsList;