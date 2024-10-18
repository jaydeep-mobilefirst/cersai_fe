import React from 'react';
import { render } from '@testing-library/react';
import NotificationItem from '../NotificationItem';

describe('NotificationItem', () => {
  it('renders the list of notifications', () => {
    // Mock notifications data
    const notifications = [
      { title: 'Notification 1', date: '2024-01-01', links: null, buttons: [] },
      { title: 'Notification 2', date: '2024-01-02', links: null, buttons: [] },
      { title: 'Notification 3', date: '2024-01-03', links: null, buttons: [] }
    ];

    // Render the NotificationItem component for each notification
    notifications.forEach((notification) => {
      const { getByText } = render(
        <NotificationItem
          title={notification.title}
          date={notification.date}
          links={notification.links}
          buttons={notification.buttons}
          notificationType=""
        />
      );

      // Assert that each notification title is rendered
      expect(getByText(notification.title)).toBeInTheDocument();
    });
  });
});
