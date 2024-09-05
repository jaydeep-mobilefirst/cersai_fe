import { render, screen } from '@testing-library/react';
import NotificationItem from '../NotificationItem';
import React from 'react';

test('renders notification item with correct title and date', () => {
    const title = 'Test Title';
    const date = '2022-01-01';
    const view = 'Test View';

    render(<NotificationItem title={title} date={date} view={view} />);

    const titleElement = screen.getByText(title);
    const dateElement = screen.getByText(date);

    expect(titleElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
});
