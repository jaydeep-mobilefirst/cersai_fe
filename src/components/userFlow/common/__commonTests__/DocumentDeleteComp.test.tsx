import { render, screen } from '@testing-library/react';
import DocumentDeleteComp from '../DocmentDeleteComp';
import React from 'react';

test('renders cancel button', () => {
    render(<DocumentDeleteComp />);
    const cancelButton = screen.getByText(/Cancel/i);
    expect(cancelButton).toBeInTheDocument();
});

test('renders okay button', () => {
    render(<DocumentDeleteComp />);
    const okayButton = screen.getByText(/Okay/i);
    expect(okayButton).toBeInTheDocument();
});

test('renders delete text', () => {
    render(<DocumentDeleteComp />);
    const deleteText = screen.getByText(/Delete/i);
    expect(deleteText).toBeInTheDocument();
});

// Add more test cases as needed
