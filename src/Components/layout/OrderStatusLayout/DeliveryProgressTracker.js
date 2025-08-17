import React from 'react';
import { Badge } from 'react-bootstrap';
import { CheckCircle, Clock, ChefHat, Truck, Home, XCircle } from 'lucide-react';

const steps = [
  { 
    id: 'placed', 
    title: 'Order Placed', 
    icon: CheckCircle,
    status: 'Placed'
  },
  { 
    id: 'ready', 
    title: 'Ready', 
    icon: ChefHat,
    status: 'Ready'
  },
  { 
    id: 'ready_to_pickup', 
    title: 'Ready to Pickup', 
    icon: Clock,
    status: 'Ready to pickup'
  },
  { 
    id: 'picked_up', 
    title: 'Picked Up', 
    icon: Truck,
    status: 'Picked-up'
  },
  { 
    id: 'in_transit', 
    title: 'In Transit', 
    icon: Truck,
    status: 'In-transit'
  },
  { 
    id: 'delivered', 
    title: 'Delivered', 
    icon: Home,
    status: 'Delivered'
  },
  {
    id: 'cancelled',
    title: 'Cancelled',
    icon: XCircle,
    status: 'Cancelled'
  }
];

const DeliveryProgressTracker = ({ status }) => {
  // Find index of current status
  const currentStepIndex = steps.findIndex(step => step.status === status);

  return (
    <div className="w-100 py-4">
      <h3 className="h4 mb-4">Delivery Progress</h3>
      <div className="position-relative">
        {/* Horizontal progress line */}
        <div className="position-absolute top-4 start-4 end-4 h-1 bg-light"></div>
        <div className="d-flex justify-content-between align-items-start gap-3 overflow-auto">
         {steps.map((step, index) => {
  let stepStatus = 'pending';
  if (status === 'Cancelled' && step.status === 'Cancelled') {
    stepStatus = 'current';
  } else if (index < currentStepIndex) {
    stepStatus = 'completed';
  } else if (index === currentStepIndex) {
    stepStatus = 'current';
  }

  const Icon = step.icon;
  return (
    <div key={step.id} className="d-flex flex-column align-items-center flex-grow-1" style={{ minWidth: '80px' }}>
      {/* Step icon */}
      <div className={`
        position-relative z-2 d-flex align-items-center justify-content-center 
        rounded-circle border-2 mb-2
        ${stepStatus === 'completed' 
          ? 'bg-success border-success text-white' 
          : stepStatus === 'current'
          ? (step.status === 'Cancelled' ? 'bg-danger border-danger text-white' 
            : step.status === 'Delivered' ? 'bg-success border-success text-white'
            : 'bg-warning border-warning text-white')
          : 'bg-light border-secondary text-muted'
        }
      `} style={{ width: '32px', height: '32px' }}>
        <Icon size={16} />
      </div>
      {/* Step content */}
      <div className="text-center w-100">
        <p className={`fw-medium mb-1 small ${
          stepStatus === 'pending' ? 'text-muted' : ''
        }`}>
          {step.title}
        </p>
        {stepStatus === 'completed' && (
          <Badge bg="success" className="mb-1 small">
            ✓ Done
          </Badge>
        )}
        {stepStatus === 'current' && (
          <>
            {step.status === 'Cancelled' ? (
              <Badge bg="danger" className="mb-1 small text-white">
                Cancelled
              </Badge>
            ) : step.status === 'Delivered' ? (
              <Badge bg="success" className="mb-1 small text-white">
                Completed
              </Badge>
            ) : (
              <Badge bg="warning" className="mb-1 small text-white">
                In Progress
              </Badge>
            )}
            <p className="small text-muted mt-1">
              {step.status === 'Placed' && 'Order received'}
              {step.status === 'Ready' && 'Order is ready'}
              {step.status === 'Ready to pickup' && 'Ready for pickup'}
              {step.status === 'Picked-up' && 'Order picked up'}
              {step.status === 'In-transit' && 'Order in transit'}
              {step.status === 'Delivered' && 'Order delivered'}
              {step.status === 'Cancelled' && 'Order cancelled'}
            </p>
          </>
        )}
      </div>
    </div>
  );
})}
        </div>
      </div>
    </div>
  );
};

export default DeliveryProgressTracker;