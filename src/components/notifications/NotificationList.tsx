import React, { useEffect, useState } from 'react';
import NotificationItem from './NotificationItem';
import {notifcationsData} from '../../utils/hardText/notificationsComponent'

interface Notification {
    name: string;
    text: string;
    img: string | null;
    link: string | null;
  }

  interface NotificationsListProps {
    notificationsData: {
      heading: Array<Notification>;
      button: Array<Notification>;
      notifications: Array<Array<Notification>>;
    };
  }


const NotificationsList: React.FC<NotificationsListProps> = ({notificationsData }) => {
    // const [notifications, setNotifications] = useState<NotificationData[]>([]);

    // useEffect(() => {
    //     setNotifications(notifcationsData.notifications);
    // }, []);

    return (
        <div >
            {notificationsData?.notifications.map((notification, index) => (
                <NotificationItem
                    key={index}
                    title={notification[0].text}
                    date={notification[1].text}
                    buttons={notificationsData?.button}
                />
            ))}
        </div>
    );
};

export default NotificationsList;