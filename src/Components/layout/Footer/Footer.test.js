import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from '@playwright/test';
import Footer from './Footer';

describe('Footer Component', () => {
    test('renders brand title and subtitle', () => {
        render(<Footer />);
        expect(screen.getByText('Bites on Bus')).toBeInTheDocument();
        expect(screen.getByText('Fresh food on the go')).toBeInTheDocument();
    });

    test('renders brand description', () => {
        render(<Footer />);
        expect(screen.getByText(/Get fresh, delicious meals delivered right to your bus seat/i)).toBeInTheDocument();
    });

    test('renders Quick Links section', () => {
        render(<Footer />);
        expect(screen.getByText('Quick Links')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('Track Order')).toBeInTheDocument();
        expect(screen.getByText('Help & Support')).toBeInTheDocument();
    });

    test('renders For Business section', () => {
        render(<Footer />);
        expect(screen.getByText('For Business')).toBeInTheDocument();
        expect(screen.getByText('Partner with Us')).toBeInTheDocument();
        expect(screen.getByText('Become Delivery Agent')).toBeInTheDocument();
        expect(screen.getByText('Bus Operators')).toBeInTheDocument();
        expect(screen.getByText('Business Support')).toBeInTheDocument();
    });

    test('renders Contact Us section and info', () => {
        render(<Footer />);
        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        expect(screen.getByText('+91 98765 43210')).toBeInTheDocument();
        expect(screen.getByText('support@buseats.com')).toBeInTheDocument();
        expect(screen.getByText('Available across India')).toBeInTheDocument();
        expect(screen.getByText('24/7 Customer Support')).toBeInTheDocument();
    });

    test('renders copyright and legal links', () => {
        render(<Footer />);
        expect(screen.getByText(/© 2024 BusEats. All rights reserved./i)).toBeInTheDocument();
        expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
        expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    });
});
