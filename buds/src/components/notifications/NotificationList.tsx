import React, { useEffect, useState } from 'react';
import NotificationItem from './NotificationItem';
import {notifcationsData} from '../../utils/hardText/notificationsComponent'

interface NotificationData {
    title: string;
    date: string;
    view: string;
}

const NotificationsList: React.FC = () => {
    const [notifications, setNotifications] = useState<NotificationData[]>([]);

    useEffect(() => {
        setNotifications(notifcationsData.notifications);
    }, []);

    return (
        <div >
            {notifications.map((notification, index) => (
                <NotificationItem
                    key={index}
                    title={notification.title}
                    date={notification.date}
                    view={notification.view}
                />
            ))}
        </div>
    );
};

export default NotificationsList;