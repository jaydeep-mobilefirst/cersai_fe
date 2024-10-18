import React from 'react';
import { render, screen } from '@testing-library/react';
import AuditTrail from '../AuditTrail';
import axios from 'axios';

// Mock the axios module
jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: [] })),
}));

describe('AuditTrail', () => {
    test('renders without error', () => {
        render(<AuditTrail />);
        expect(screen.getByText('No data')).toBeInTheDocument();
    });

    test('renders table with data', () => {
        const auditTrailData = [
            {
                id: '1',
                user: 'John Doe',
                from: 'A',
                to: 'B',
                remark: 'Some remark',
                updatedAt: '2022-01-01T00:00:00Z',
            },
            // Add more data as needed
        ];

        render(<AuditTrail />);
        expect(screen.getByText('S.No.')).toBeInTheDocument();
        expect(screen.getByText('Status Change By')).toBeInTheDocument();
        expect(screen.getByText('From')).toBeInTheDocument();
        expect(screen.getByText('To')).toBeInTheDocument();
        expect(screen.getByText('Remarks')).toBeInTheDocument();
        expect(screen.getByText('Date')).toBeInTheDocument();

        // Verify that the table renders the correct number of rows
        expect(screen.getAllByRole('row')).toHaveLength(auditTrailData.length + 1);
    });

    // Add more test cases as needed
});
