// Mock notification service for demonstration purposes
export interface NotificationSettings {
  platformNotifications: boolean;
  emailNotifications: boolean;
  locations: string[];
  formats: string[];
  frequency: 'immediate' | 'daily' | 'weekly';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'opportunity' | 'achievement' | 'reminder';
  timestamp: Date;
  read: boolean;
  opportunityId?: string;
}

export class NotificationService {
  static settings: NotificationSettings = {
    platformNotifications: true,
    emailNotifications: false,
    locations: [],
    categories: [],
    formats: [],
    frequency: 'immediate'
  };

  static getSettings(): NotificationSettings {
    const saved = localStorage.getItem('notificationSettings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return this.settings;
      }
    }
    return this.settings;
  }

  static saveSettings(settings: NotificationSettings): void {
    localStorage.setItem('notificationSettings', JSON.stringify(settings));
    this.settings = settings;
  }

  static async sendPlatformNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): Promise<void> {
    // In a real app, this would send the notification to the user's device
    console.log('Platform notification sent:', notification);
    
    // Simulate showing notification in UI
    const newNotification: Notification = {
      id: Math.random().toString(36).substring(2, 9),
      ...notification,
      timestamp: new Date(),
      read: false
    };
    
    // Store in localStorage for demo purposes
    const notifications = this.getNotifications();
    notifications.push(newNotification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    // In a real implementation, you would update the UI state here
    console.log('Notification stored:', newNotification);
  }

  static getNotifications(): Notification[] {
    const saved = localStorage.getItem('notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  }

  static markAsRead(notificationId: string): void {
    const notifications = this.getNotifications();
    const updated = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    localStorage.setItem('notifications', JSON.stringify(updated));
  }

  static clearNotifications(): void {
    localStorage.removeItem('notifications');
  }

  // Mock function to simulate checking for new opportunities
  static checkForNewOpportunities(): void {
    const settings = this.getSettings();
    if (settings.platformNotifications || settings.emailNotifications) {
      // In a real app, this would check for new opportunities matching user's criteria
      console.log('Checking for new opportunities based on settings:', settings);
      
      // Simulate sending a notification
      if (settings.platformNotifications) {
        this.sendPlatformNotification({
          title: "New STEM Opportunity Available",
          message: "A new opportunity has been posted that matches your preferences",
          type: 'opportunity'
        });
      }
    }
  }
}