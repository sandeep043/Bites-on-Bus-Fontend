import React from 'react';
import { Badge } from 'react-bootstrap';
import { CheckCircle, Clock, ChefHat, Truck, Home } from 'lucide-react';

const steps = [
  { 
    id: 'placed', 
    title: 'Order Placed', 
    icon: CheckCircle,
    statuses: ['placed', 'confirmed', 'preparing', 'prepared', 'on the way', 'delivered']
  },
  { 
    id: 'confirmed', 
    title: 'Restaurant Confirmed', 
    icon: Clock,
    statuses: ['confirmed', 'preparing', 'prepared', 'on the way', 'delivered']
  },
  { 
    id: 'preparing', 
    title: 'Food Prepared', 
    icon: ChefHat,
    statuses: ['prepared', 'on the way', 'delivered']
  },
  { 
    id: 'out_for_delivery', 
    title: 'Out for Delivery', 
    icon: Truck,
    statuses: ['on the way', 'delivered']
  },
  { 
    id: 'delivered', 
    title: 'Delivered', 
    icon: Home,
    statuses: ['delivered']
  }
];

const DeliveryProgressTracker = ({ status, deliveryStatus }) => {
  const currentStatus = status.toLowerCase();
  const currentDeliveryStatus = deliveryStatus.toLowerCase();
  
  const getStepStatus = (step, index) => {
    if (step.statuses.includes(currentStatus) || 
        (step.id === 'out_for_delivery' && currentDeliveryStatus !== 'pending') ||
        (step.id === 'delivered' && currentStatus === 'delivered')) {
      return 'completed';
    }
    
    // Current step logic
    if ((currentStatus === 'placed' && index === 0) ||
        (currentStatus === 'confirmed' && index === 1) ||
        (currentStatus === 'preparing' && index === 2) ||
        (currentDeliveryStatus !== 'pending' && index === 3) ||
        (currentStatus === 'delivered' && index === 4)) {
      return 'current';
    }
    
    return 'pending';
  };

  return (
    <div className="w-100 py-4">
      <h3 className="h4 mb-4">Delivery Progress</h3>
      
      <div className="position-relative">
        {/* Horizontal progress line */}
        <div className="position-absolute top-4 start-4 end-4 h-1 bg-light"></div>
        
        <div className="d-flex justify-content-between align-items-start gap-3 overflow-auto">
          {steps.map((step, index) => {
            const stepStatus = getStepStatus(step, index);
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
                    ? 'bg-warning border-warning text-white'
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
                      <Badge bg="warning" className="mb-1 small text-white">
                        In Progress
                      </Badge>
                      <p className="small text-muted mt-1">
                        {step.id === 'placed' && 'Order received'}
                        {step.id === 'confirmed' && 'Restaurant reviewing'}
                        {step.id === 'preparing' && 'Food being prepared'}
                        {step.id === 'out_for_delivery' && 'Driver on the way'}
                        {step.id === 'delivered' && 'Order delivered'}
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