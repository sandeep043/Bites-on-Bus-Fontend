import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import RestaurantRegistration from './RestaurantRegistration';

// Mock axios
jest.mock('axios');

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('RestaurantRegistration Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorageMock.getItem.mockReturnValue(JSON.stringify({ token: 'mock-token-123' }));
        // Always mock axios.get for every test to avoid undefined error
        axios.get.mockResolvedValue({ data: { restaurants: [] } });
    });

    test('renders registration header and tabs', async () => {
        await act(async () => {
            render(<RestaurantRegistration />);
        });
        expect(screen.getByText('Restaurant Management')).toBeInTheDocument();
        expect(screen.getAllByText('Register Restaurant').length).toBeGreaterThan(0);
        expect(screen.getByText('Restaurant List')).toBeInTheDocument();
    });

    test('shows registration form by default', async () => {
        await act(async () => {
            render(<RestaurantRegistration />);
        });
        expect(screen.getByText('Owner Information')).toBeInTheDocument();
        expect(screen.getByText('Restaurant Information')).toBeInTheDocument();
        // Use getAllByRole and filter for submit button
        const buttons = screen.getAllByRole('button', { name: /Register Restaurant/i });
        expect(buttons.some(btn => btn.type === 'submit')).toBe(true);
    });

    test('switches to restaurant list tab and displays restaurants', async () => {
        const mockRestaurants = {
            restaurants: [
                {
                    _id: '1',
                    name: 'Pizza Palace',
                    cuisineType: 'Italian',
                    contactNumber: '1234567890',
                    isActive: true,
                },
                {
                    _id: '2',
                    name: 'Burger House',
                    cuisineType: 'American',
                    contactNumber: '9876543210',
                    isActive: false,
                },
            ],
        };
        axios.get.mockResolvedValue({ data: mockRestaurants });

        await act(async () => {
            render(<RestaurantRegistration />);
        });

        // Switch to list tab
        fireEvent.click(screen.getByText('Restaurant List'));

        // Wait for restaurants to load
        expect(await screen.findByText('Registered Restaurants')).toBeInTheDocument();
        expect(await screen.findByText('Pizza Palace')).toBeInTheDocument();
        expect(await screen.findByText('Burger House')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(screen.getByText('Pending')).toBeInTheDocument();
    });

    test('handles empty restaurant list', async () => {
        axios.get.mockResolvedValue({ data: { restaurants: [] } });

        await act(async () => {
            render(<RestaurantRegistration />);
        });

        fireEvent.click(screen.getByText('Restaurant List'));
        expect(await screen.findByText('Registered Restaurants')).toBeInTheDocument();
        expect(screen.getByText('Total: 0')).toBeInTheDocument();
    });

    test('submits registration form', async () => {
        axios.post.mockResolvedValue({ data: { success: true } });

        await act(async () => {
            render(<RestaurantRegistration />);
        });

        fireEvent.change(screen.getByPlaceholderText("Enter owner's full name"), { target: { value: 'Test Owner' } });
        fireEvent.change(screen.getByPlaceholderText("Enter email address"), { target: { value: 'owner@test.com' } });
        fireEvent.change(screen.getByPlaceholderText("Enter phone number"), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByPlaceholderText("Enter govtId"), { target: { value: 'ID123' } });
        fireEvent.change(screen.getByPlaceholderText("Enter password"), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText("Enter restaurant name"), { target: { value: 'Test Restaurant' } });
        fireEvent.change(screen.getByPlaceholderText("Enter restaurant Number"), { target: { value: '9876543210' } });
        fireEvent.change(screen.getByPlaceholderText("Enter Stop Name"), { target: { value: 'Main Stop' } });
        fireEvent.change(screen.getByPlaceholderText("Enter City"), { target: { value: 'Test City' } });

        // Ensure we are on the registration tab before submitting
        fireEvent.click(screen.getAllByText('Register Restaurant')[0]);

        const submitBtn = screen.getAllByRole('button', { name: /Register Restaurant/i })
            .find(btn => btn.type === 'submit');
        fireEvent.click(submitBtn);

     
    });
});

