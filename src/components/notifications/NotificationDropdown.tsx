import { useEffect, useState } from "react";
import { Notification, NotificationService } from "../../lib/notifications";
import NotificationList from "./NotificationList";

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const fetchNotifications = () => {
        const storedNotifications = NotificationService.getNotifications();
        setNotifications(storedNotifications);
        setLoading(false);
      };

      fetchNotifications();
      
      // Set up interval to refresh notifications
      const interval = setInterval(fetchNotifications, 10000);
      
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="absolute right-0 mt-2 w-80 rounded-lg border border-gray-700 bg-gray-800 shadow-lg z-30"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 border-b border-gray-700">
        <h3 className="font-medium text-white">Notifications</h3>
      </div>
      <div className="p-4 max-h-96 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        ) : notifications.length > 0 ? (
          <NotificationList className="h-auto" />
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-400">No notifications yet</p>
            <p className="text-sm text-gray-500 mt-1">You'll receive notifications about new opportunities and achievements</p>
          </div>
        )}
      </div>
    </div>
  );
}