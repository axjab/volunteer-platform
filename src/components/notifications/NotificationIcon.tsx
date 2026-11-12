import { useEffect, useState } from "react";
import { NotificationService } from "../../lib/notifications";

interface NotificationIconProps {
  className?: string;
  onClick?: () => void;
}

export default function NotificationIcon({ className = "", onClick }: NotificationIconProps) {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const notifications = NotificationService.getNotifications();
      const unreadCount = notifications.filter(n => !n.read).length;
      setNotificationCount(unreadCount);
    };

    // Initial update
    updateCount();

    // Listen for changes (you would normally use a proper state management system)
    const interval = setInterval(updateCount, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`} onClick={onClick}>
      <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {notificationCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
          {notificationCount}
        </span>
      )}
    </div>
  );
}