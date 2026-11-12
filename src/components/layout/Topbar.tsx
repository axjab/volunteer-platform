import { Bell, Search } from "lucide-react";
import { currentUser } from "../../data/mockData";
import { useNavigate } from "react-router-dom";
import NotificationIcon from "../notifications/NotificationIcon";
import NotificationDropdown from "../notifications/NotificationDropdown";
import { useEffect, useState } from "react";

export default function Topbar() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const notificationElement = document.getElementById('notification-dropdown');
      if (notificationElement && !notificationElement.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-gray-700 bg-gray-900">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm text-gray-400">Employee Volunteering Experience</p>
          <h2 className="text-xl font-semibold text-white">Make STEM futures possible</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 md:flex">
            <Search size={16} className="text-gray-400" />
            <input
              className="w-56 bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
              placeholder="Search opportunities, rewards..."
            />
          </div>

          <div className="relative">
            <button 
              className="relative rounded-lg border border-gray-700 bg-gray-800 p-3 text-gray-400 hover:text-white"
              onClick={handleNotificationClick}
            >
              <NotificationIcon onClick={handleNotificationClick} />
            </button>
            
            <NotificationDropdown 
              isOpen={showNotifications} 
              onClose={() => setShowNotifications(false)} 
            />
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 cursor-pointer" onClick={handleProfileClick}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
              {currentUser.avatar}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white">{currentUser.name}</p>
              <p className="text-xs text-gray-400">{currentUser.tier}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}