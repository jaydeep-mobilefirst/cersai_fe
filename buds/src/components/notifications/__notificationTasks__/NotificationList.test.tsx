import React from 'react';
import { render } from '@testing-library/react';
import NotificationsList from '../NotificationList';

describe('NotificationsList', () => {
    it('renders the list of notifications', () => {
        const { getByText } = render(<NotificationsList />);
        
        // Assert that the notifications are rendered
        expect(getByText('Notification 1')).toBeInTheDocument();
        expect(getByText('Notification 2')).toBeInTheDocument();
        expect(getByText('Notification 3')).toBeInTheDocument();
    });
});
