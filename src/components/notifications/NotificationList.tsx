import { useEffect, useState } from "react";
import { Notification, NotificationService } from "../../lib/notifications";

interface NotificationListProps {
  className?: string;
  onClick?: () => void;
}

export default function NotificationList({ className = "", onClick }: NotificationListProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = () => {
      const storedNotifications = NotificationService.getNotifications();
      setNotifications(storedNotifications);
      setLoading(false);
    };

    fetchNotifications();
    
    // Set up interval to refresh notifications
    const interval = setInterval(fetchNotifications, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: string) => {
    NotificationService.markAsRead(id);
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className={`bg-gray-800 border border-gray-700 rounded-lg p-4 ${className}`}>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className={`bg-gray-800 border border-gray-700 rounded-lg p-6 text-center ${className}`}>
        <p className="text-gray-400">No notifications yet</p>
        <p className="text-sm text-gray-500 mt-1">You'll receive notifications about new opportunities and achievements</p>
      </div>
    );
  }

  return (
    <div className={`bg-gray-800 border border-gray-700 rounded-lg ${className}`} onClick={onClick}>
      <div className="p-4 border-b border-gray-700">
        <h3 className="font-medium text-white">Recent Notifications</h3>
      </div>
      <div className="divide-y divide-gray-700">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 ${!notification.read ? 'bg-gray-750' : ''}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex h-3 w-3 rounded-full ${notification.read ? 'bg-gray-500' : 'bg-blue-500'}`}></span>
                  <h4 className="font-medium text-white">{notification.title}</h4>
                </div>
                <p className="mt-2 text-sm text-gray-300">{notification.message}</p>
                <p className="mt-2 text-xs text-gray-500">{formatDate(notification.timestamp)}</p>
              </div>
              {!notification.read && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    markAsRead(notification.id);
                  }}
                  className="ml-2 text-xs text-blue-400 hover:text-blue-300"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}