import { useState } from "react";
import { cn } from "../../lib/cn";
import Card from "../ui/Card";
import Button from "../ui/Button";

interface NotificationSettingsProps {
  onSettingsChange: (settings: NotificationSettings) => void;
  initialSettings?: NotificationSettings;
}

interface NotificationSettings {
  platformNotifications: boolean;
  emailNotifications: boolean;
  locations: string[];
  formats: string[];
  frequency: 'immediate' | 'daily' | 'weekly';
}

export default function NotificationSettings({ 
  onSettingsChange, 
  initialSettings 
}: NotificationSettingsProps) {
  const [settings, setSettings] = useState<NotificationSettings>({
    platformNotifications: initialSettings?.platformNotifications || false,
    emailNotifications: initialSettings?.emailNotifications || false,
    locations: initialSettings?.locations || [],
    formats: initialSettings?.formats || [],
    frequency: initialSettings?.frequency || 'immediate'
  });

  const locations = ['Ottawa', 'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton'];
  const formats = ['In-person', 'Virtual', 'Hybrid'];

  const toggleLocation = (location: string) => {
    setSettings(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location]
    }));
  };

  const toggleFormat = (format: string) => {
    setSettings(prev => ({
      ...prev,
      formats: prev.formats.includes(format)
        ? prev.formats.filter(f => f !== format)
        : [...prev.formats, format]
    }));
  };

  const handleSave = () => {
    onSettingsChange(settings);
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
      
      <div className="space-y-6">
        {/* Notification Channels */}
        <div>
          <h4 className="font-medium text-white mb-3">Notification Channels</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Platform Notifications</p>
                <p className="text-sm text-gray-400">Get notified within the platform</p>
              </div>
              <button
                onClick={() => setSettings(prev => ({ ...prev, platformNotifications: !prev.platformNotifications }))}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full",
                  settings.platformNotifications ? "bg-blue-500" : "bg-gray-600"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition",
                    settings.platformNotifications ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Email Notifications</p>
                <p className="text-sm text-gray-400">Get notified via email</p>
              </div>
              <button
                onClick={() => setSettings(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full",
                  settings.emailNotifications ? "bg-blue-500" : "bg-gray-600"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition",
                    settings.emailNotifications ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Frequency */}
        <div>
          <h4 className="font-medium text-white mb-3">Notification Frequency</h4>
          <div className="grid grid-cols-3 gap-3">
            {(['immediate', 'daily', 'weekly'] as const).map((freq) => (
              <button
                key={freq}
                onClick={() => setSettings(prev => ({ ...prev, frequency: freq }))}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-medium",
                  settings.frequency === freq
                    ? "border-blue-500 bg-blue-500/10 text-blue-300"
                    : "border-gray-700 bg-gray-700 text-gray-300"
                )}
              >
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Location Preferences */}
        <div>
          <h4 className="font-medium text-white mb-3">Location Preferences</h4>
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => toggleLocation(location)}
                className={cn(
                  "rounded-full px-3 py-1 text-sm",
                  settings.locations.includes(location)
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "bg-gray-700 text-gray-300 border border-gray-600"
                )}
              >
                {location}
              </button>
            ))}
          </div>
        </div>

        {/* Format Preferences */}
        <div>
          <h4 className="font-medium text-white mb-3">Opportunity Format</h4>
          <div className="flex flex-wrap gap-2">
            {formats.map((format) => (
              <button
                key={format}
                onClick={() => toggleFormat(format)}
                className={cn(
                  "rounded-full px-3 py-1 text-sm",
                  settings.formats.includes(format)
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "bg-gray-700 text-gray-300 border border-gray-600"
                )}
              >
                {format}
              </button>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleSave} 
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          Save Notification Preferences
        </Button>
      </div>
    </Card>
  );
}