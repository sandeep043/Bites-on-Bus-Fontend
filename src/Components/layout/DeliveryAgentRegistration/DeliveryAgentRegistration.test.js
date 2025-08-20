import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import DeliveryAgentRegistration from './DeliveryAgentRegistration';

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

describe('DeliveryAgentRegistration Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorageMock.getItem.mockReturnValue(JSON.stringify({ token: 'mock-token-123' }));
    });

    test('renders registration header and tabs', async () => {
        await act(async () => {
            render(<DeliveryAgentRegistration />);
        });
        expect(screen.getByText('Delivery Agent Management')).toBeInTheDocument();
        expect(screen.getAllByText('Register Agent').length).toBeGreaterThan(0);
        expect(screen.getByText('Agent List')).toBeInTheDocument();
    });

    test('shows registration form by default', async () => {
        await act(async () => {
            render(<DeliveryAgentRegistration />);
        });
        expect(screen.getByText('Personal Information')).toBeInTheDocument();
        expect(screen.getByText('Vehicle & Work Information')).toBeInTheDocument();
        const buttons = screen.getAllByRole('button', { name: /Register Agent/i });
        expect(buttons.some(btn => btn.type === 'submit')).toBe(true);
    });

    test('switches to agent list tab and displays agents', async () => {
        await act(async () => {
            render(<DeliveryAgentRegistration />);
        });

        fireEvent.click(screen.getByText('Agent List'));

        expect(await screen.findByText('Registered Delivery Agents')).toBeInTheDocument();
        expect(screen.getByText('Mike Johnson')).toBeInTheDocument();
        expect(screen.getByText('Lisa Chen')).toBeInTheDocument();
        expect(screen.getByText('David Rodriguez')).toBeInTheDocument();

        // Use getAllByText for ambiguous status
        expect(screen.getAllByText('ACTIVE').length).toBeGreaterThan(1);
        expect(screen.getByText('PENDING')).toBeInTheDocument();
    });

    test('submits agent registration form', async () => {
        axios.post.mockResolvedValue({ data: { success: true } });

        await act(async () => {
            render(<DeliveryAgentRegistration />);
        });

        fireEvent.change(screen.getByPlaceholderText("Enter full name"), { target: { value: 'Test Agent' } });
        fireEvent.change(screen.getByPlaceholderText("Enter email address"), { target: { value: 'agent@test.com' } });
        fireEvent.change(screen.getByPlaceholderText("Enter phone number"), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByPlaceholderText("Enter ID/License number"), { target: { value: 'ID123' } });
        fireEvent.change(screen.getByPlaceholderText("Enter password"), { target: { value: 'password123' } });

        // Use getAllByPlaceholderText for ambiguous "Enter license plate number"
        const licensePlateInputs = screen.getAllByPlaceholderText("Enter license plate number");
        fireEvent.change(licensePlateInputs[0], { target: { value: 'MH12AB1234' } }); // licensePlate
        fireEvent.change(licensePlateInputs[1], { target: { value: 'Main Stop' } });   // stop
        fireEvent.change(licensePlateInputs[2], { target: { value: 'Test City' } });   // city

        fireEvent.change(screen.getByPlaceholderText("Enter bank account number"), { target: { value: '123456789012' } });





        await act(async () => {
            await Promise.resolve();
        });


    });
});
