import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserManagement from './UserManagement';

// Mock external dependencies
jest.mock('axios');
jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
}));

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
    Search: () => <div data-testid="search-icon">Search</div>,
    Filter: () => <div data-testid="filter-icon">Filter</div>,
    UserCheck: () => <div data-testid="user-check-icon">UserCheck</div>,
    UserX: () => <div data-testid="user-x-icon">UserX</div>,
    MoreVertical: () => <div data-testid="more-vertical-icon">MoreVertical</div>,
    Mail: () => <div data-testid="mail-icon">Mail</div>,
    Phone: () => <div data-testid="phone-icon">Phone</div>,
}));

describe('UserManagement Component', () => {
    const mockUsers = [
        {
            _id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            role: 'customer',
            status: 'active',
            createdAt: '2023-01-01T00:00:00.000Z',
        },
        {
            _id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+0987654321',
            role: 'restaurant_owner',
            status: 'pending',
            createdAt: '2023-02-01T00:00:00.000Z',
        },
        {
            _id: '3',
            name: 'Bob Wilson',
            email: 'bob@example.com',
            phone: '+1122334455',
            role: 'delivery_agent',
            status: 'inactive',
            createdAt: '2023-03-01T00:00:00.000Z',
        },
    ];

    beforeEach(() => {
        // Reset all mocks
        jest.clearAllMocks();

        // Mock localStorage token
        localStorageMock.getItem.mockReturnValue(
            JSON.stringify({ token: 'mock-token-123' })
        );

        // Mock successful API response
        axios.get.mockResolvedValue({
            data: { users: mockUsers },
        });
    });

    test('renders component with header and controls', async () => {
        await act(async () => {
            render(<UserManagement />);
        });

        expect(screen.getByText('User Management')).toBeInTheDocument();
        expect(screen.getByText('Manage all users across your platform')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search users by name or email...')).toBeInTheDocument();
        expect(screen.getByDisplayValue('All Roles')).toBeInTheDocument();
    });

    // test('fetches users on component mount', async () => {
    //   await act(async () => {
    //     render(<UserManagement />);
    //   });

    //   expect(axios.get).toHaveBeenCalledWith(
    //     'http://localhost:4000/api/user/getall',
    //     {
    //       headers: {
    //         Authorization: 'Bearer mock-token-123',
    //       },
    //     }
    //   );

    //   // Verify users are displayed
    //   expect(screen.getByText('John Doe')).toBeInTheDocument();
    //   expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    //   expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
    // });

    test('handles API fetch error', async () => {
        const errorMessage = 'Network Error';
        axios.get.mockRejectedValue(new Error(errorMessage));

        await act(async () => {
            render(<UserManagement />);
        });

        expect(toast.error).toHaveBeenCalledWith(
            'Failed to fetch users. Please try again later.'
        );
    });

    test('filters users by search term', async () => {
        await act(async () => {
            render(<UserManagement />);
        });

        const searchInput = screen.getByPlaceholderText('Search users by name or email...');

        // Search for "John"
        await act(async () => {
            fireEvent.change(searchInput, { target: { value: 'John' } });
        });

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
        expect(screen.queryByText('Bob Wilson')).not.toBeInTheDocument();

        // Search for email
        await act(async () => {
            fireEvent.change(searchInput, { target: { value: 'jane@example.com' } });
        });

        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    test('filters users by role', async () => {
        await act(async () => {
            render(<UserManagement />);
        });

        const roleFilter = screen.getByDisplayValue('All Roles');

        // Filter by restaurant_owner
        await act(async () => {
            fireEvent.change(roleFilter, { target: { value: 'restaurant_owner' } });
        });

        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        expect(screen.queryByText('Bob Wilson')).not.toBeInTheDocument();

        // Filter by delivery_agent
        await act(async () => {
            fireEvent.change(roleFilter, { target: { value: 'delivery_agent' } });
        });

        expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });

    test('displays user information correctly', async () => {
        await act(async () => {
            render(<UserManagement />);
        });

        // Check user details
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
        expect(screen.getByText('+1234567890')).toBeInTheDocument();
        expect(screen.getByText('CUSTOMER')).toBeInTheDocument();
        expect(screen.getByText('ACTIVE')).toBeInTheDocument();
        expect(screen.getByText('1/1/2023')).toBeInTheDocument();
    });

    test('displays correct role badges with proper classes', async () => {
        await act(async () => {
            render(<UserManagement />);
        });

        const customerBadge = screen.getByText('CUSTOMER');
        const ownerBadge = screen.getByText('RESTAURANT OWNER');
        const agentBadge = screen.getByText('DELIVERY AGENT');


        expect(ownerBadge).toHaveClass('green');
        expect(agentBadge).toHaveClass('purple');
    });

    test('displays correct status badges with proper classes', async () => {
        await act(async () => {
            render(<UserManagement />);
        });

        const activeBadge = screen.getByText('ACTIVE');
        const pendingBadge = screen.getByText('PENDING');
        const inactiveBadge = screen.getByText('INACTIVE');

        expect(activeBadge).toHaveClass('green');
        expect(pendingBadge).toHaveClass('yellow');
        expect(inactiveBadge).toHaveClass('red');
    });

    test('shows correct user count in footer', async () => {
        await act(async () => {
            render(<UserManagement />);
        });

        expect(screen.getByText(`Showing ${mockUsers.length} of ${mockUsers.length} users`)).toBeInTheDocument();

        // Test filtered count
        const searchInput = screen.getByPlaceholderText('Search users by name or email...');
        await act(async () => {
            fireEvent.change(searchInput, { target: { value: 'John' } });
        });

        expect(screen.getByText('Showing 1 of 3 users')).toBeInTheDocument();
    });

    test('handles empty users array', async () => {
        axios.get.mockResolvedValue({
            data: { users: [] },
        });

        await act(async () => {
            render(<UserManagement />);
        });

        expect(screen.getByText('Showing 0 of 0 users')).toBeInTheDocument();
    });

    test('handles missing token in localStorage', async () => {
        localStorageMock.getItem.mockReturnValue(null);

        await act(async () => {
            render(<UserManagement />);
        });

        // API call should still be attempted but without Authorization header
        expect(axios.get).toHaveBeenCalled();
    });

    test('displays action buttons for each user', async () => {
        await act(async () => {
            render(<UserManagement />);
        });

        const approveButtons = screen.getAllByTitle('Approve');
        const suspendButtons = screen.getAllByTitle('Suspend');
        const moreButtons = screen.getAllByTitle('More options');

        expect(approveButtons).toHaveLength(mockUsers.length);
        expect(suspendButtons).toHaveLength(mockUsers.length);
        expect(moreButtons).toHaveLength(mockUsers.length);
    });

    test('handles user data with missing properties gracefully', async () => {
        const incompleteUser = {
            _id: '4',
            name: 'Incomplete User',
            // Missing email, phone, role, status, createdAt
        };

        axios.get.mockResolvedValue({
            data: { users: [incompleteUser] },
        });

        await act(async () => {
            render(<UserManagement />);
        });

        expect(screen.getByText('Incomplete User')).toBeInTheDocument();
        expect(screen.getByText('ACTIVE')).toBeInTheDocument(); // Default status
    });
});




