// Dummy data
const dummyOrders = [
    {
        id: 'ORD001',
        pnr: 'BUS1234567',
        customer: 'Priya Sharma',
        phone: '+91 98765 43210',
        seat: '12A',
        items: [
            { name: 'Butter Chicken', quantity: 1, price: 280 },
            { name: 'Garlic Naan', quantity: 2, price: 60 }
        ],
        total: 400,
        status: 'preparing',
        order_time: '2:15 PM',
        delivery_time: '3:00 PM',
        stop_name: 'Highway Rest Point',
        restaurant_id: 'rest_001',
        bus_route: 'Delhi - Mumbai',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: 'ORD002',
        pnr: 'BUS2345678',
        customer: 'Raj Patel',
        phone: '+91 87654 32109',
        seat: '08B',
        items: [
            { name: 'Biryani', quantity: 1, price: 320 },
            { name: 'Dal Makhani', quantity: 1, price: 180 }
        ],
        total: 500,
        status: 'ready',
        order_time: '2:30 PM',
        delivery_time: '3:15 PM',
        stop_name: 'City Center Stop',
        restaurant_id: 'rest_001',
        bus_route: 'Delhi - Jaipur',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: 'ORD003',
        pnr: 'BUS3456789',
        customer: 'Anita Singh',
        phone: '+91 76543 21098',
        seat: '15C',
        items: [
            { name: 'Paneer Tikka', quantity: 1, price: 250 },
            { name: 'Roti', quantity: 3, price: 40 }
        ],
        total: 370,
        status: 'ready',
        order_time: '2:45 PM',
        delivery_time: '3:30 PM',
        stop_name: 'Airport Junction',
        restaurant_id: 'rest_001',
        bus_route: 'Mumbai - Pune',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
];

const dummyAgents = [
    { id: 'agent_001', name: 'Vikram Kumar', phone: '+91 98765 12345', vehicle_type: 'Motorcycle', is_online: true },
    { id: 'agent_002', name: 'Suresh Yadav', phone: '+91 87654 23456', vehicle_type: 'Bicycle', is_online: true },
    { id: 'agent_003', name: 'Ravi Singh', phone: '+91 76543 34567', vehicle_type: 'Scooter', is_online: false }
];

// Global state
let orders = [...dummyOrders];
let agents = [...dummyAgents];
let subscribers = [];

// Generate OTP
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

// Subscribe to order updates
export const subscribeToOrderUpdates = (callback) => {
    subscribers.push(callback);
    return {
        unsubscribe: () => {
            subscribers = subscribers.filter(sub => sub !== callback);
        }
    };
};

// Notify all subscribers
const notifySubscribers = () => {
    subscribers.forEach(callback => callback([...orders]));
};

// Order management functions
export const updateOrderStatus = async (orderId, status, agentId) => {
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) throw new Error('Order not found');

    const updates = {
        status,
        updated_at: new Date().toISOString()
    };

    if (agentId) {
        const agent = agents.find(a => a.id === agentId);
        updates.delivery_agent_id = agentId;
        if (agent) {
            updates.agent_name = agent.name;
            updates.agent_phone = agent.phone;
            updates.agent_vehicle = agent.vehicle_type;
        }
    }

    if (status === 'ready') {
        updates.otp = generateOTP();
    }

    orders[orderIndex] = { ...orders[orderIndex], ...updates };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    notifySubscribers();
    return orders[orderIndex];
};

export const getAvailableOrders = async () => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return orders.filter(order => order.status === 'ready' && !order.delivery_agent_id);
};

export const getAgentOrders = async (agentId) => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return orders.filter(order =>
        order.delivery_agent_id === agentId &&
        ['assigned', 'picked-up', 'in-transit'].includes(order.status)
    );
};

export const getRestaurantOrders = async (restaurantId) => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return orders.filter(order => order.restaurant_id === restaurantId);
};

export const assignOrderToAgent = async (orderId, agentId) => {
    return updateOrderStatus(orderId, 'assigned', agentId);
};

// Get all orders for debugging
export const getAllOrders = () => {
    return [...orders];
};

// Add new order (for testing)
export const addOrder = (order) => {
    const newOrder = {
        ...order,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
    orders.push(newOrder);
    notifySubscribers();
    return newOrder;
};