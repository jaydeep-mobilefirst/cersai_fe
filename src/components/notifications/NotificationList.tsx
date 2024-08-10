import React from 'react';
import NotificationItem from './NotificationItem';
import { notifcationsData } from '../../utils/hardText/notificationsComponent';

interface Notification {
  text: string;
  date?: string; // Making date optional
  link: string | null;
}

interface Notifications {
  name: string;
  text: string;
  img: string | null;
  link: string | null;
}

interface NotificationsListProps {
  notificationsData: {
    heading: Notification[];
    button: Notifications[];
    notifications: Notification[];
  };
}

const NotificationsList: React.FC<NotificationsListProps> = ({ notificationsData }) => {
  return (
    <div>
      {notificationsData?.notifications?.map((notification, index) => (
        <NotificationItem
          key={index}
          title={notification?.text}
          links={notification?.link}
          date={notification?.date || ''} // Provide default value for date
          buttons={notificationsData?.button}
        />
      ))}
    </div>
  );
};

export default NotificationsList;