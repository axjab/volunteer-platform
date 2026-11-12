import { useState, useEffect } from "react";
import { currentUser } from "../../data/mockData";
import NotificationSettings from "./NotificationSettings";
import { NotificationService } from "../../lib/notifications";

interface NotificationSettings {
  platformNotifications: boolean;
  emailNotifications: boolean;
  locations: string[];
  formats: string[];
  frequency: 'immediate' | 'daily' | 'weekly';
}

interface NotificationPreference {
  userId: string;
  settings: NotificationSettings;
  createdAt: Date;
  updatedAt: Date;
}

export default function NotificationManager() {
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load existing settings
  useEffect(() => {
    const loadSettings = () => {
      // In a real app, this would fetch from a backend
      const savedSettings = localStorage.getItem('notificationSettings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setSettings(parsed);
        } catch (e) {
          setSettings(null);
        }
      } else {
        setSettings(null);
      }
      setIsLoading(false);
    };

    loadSettings();
  }, []);

  const handleSettingsChange = (newSettings: NotificationSettings) => {
    setSettings(newSettings);
    
    // Save to localStorage in a real app
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
    
    // Update the service settings
    NotificationService.saveSettings(newSettings);
    
    // In a real app, you would send this to your backend
    console.log('Saving notification settings:', newSettings);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Notification Preferences</h2>
        <p className="text-gray-400 mt-1">
          Customize how and when you receive notifications about new volunteering opportunities
        </p>
      </div>

      <NotificationSettings 
        initialSettings={settings || undefined}
        onSettingsChange={handleSettingsChange} 
      />

      {settings && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h3 className="font-medium text-white mb-2">Your Current Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Channels:</p>
              <p className="text-white">
                {settings.platformNotifications ? 'Platform' : ''} 
                {settings.platformNotifications && settings.emailNotifications ? ', ' : ''}
                {settings.emailNotifications ? 'Email' : ''}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Frequency:</p>
              <p className="text-white capitalize">{settings.frequency}</p>
            </div>
            <div>
              <p className="text-gray-400">Locations:</p>
              <p className="text-white">
                {settings.locations.length > 0 ? settings.locations.join(', ') : 'All locations'}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Formats:</p>
              <p className="text-white">
                {settings.formats.length > 0 ? settings.formats.join(', ') : 'All formats'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}