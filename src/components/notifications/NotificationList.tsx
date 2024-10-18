import React from 'react';

interface Notification {
    title: string;
    date: string;
    links: string | null;
    buttons: string[];
}

interface NotificationsListProps {
    notifications: Notification[];
}

const NotificationsList: React.FC<NotificationsListProps> = ({ notifications }) => {
    return (
        <div>
            {notifications.map((notification, index) => (
                <div key={index} className="p-3 bg-white rounded-lg border mb-4">
                    <div className="text-bold">{notification.title}</div>
                    <div className="text-muted">{notification.date}</div>
                </div>
            ))}
        </div>
    );
};

export default NotificationsList;
