export interface SocietySettings {
  general: {
    name: string;
    registrationNumber: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    description: string;
    societyCode: string;
  };
  branding: {
    logoUrl: string;
    coverUrl: string;
    primaryColor: string;
    secondaryColor: string;
  };
  amenities: {
    id: string;
    name: string;
    enabled: boolean;
    description: string;
  }[];
  maintenance: {
    dueDate: number; // Day of month
    lateFee: number; // Fixed amount
    penaltyPercentage: number;
    reminderDays: number;
    invoicePrefix: string;
  };
  visitorRules: {
    allowedFrom: string;
    allowedTo: string;
    maxVisitorsPerFlat: number;
    requireVehicleDetails: boolean;
    enableQrEntry: boolean;
    requireResidentApproval: boolean;
  };
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    maintenanceReminders: boolean;
    visitorAlerts: boolean;
    complaintAlerts: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number; // in minutes
    passwordPolicy: string;
  };
  integrations: {
    id: string;
    name: string;
    status: 'CONNECTED' | 'DISCONNECTED';
    lastSync: string;
    type: 'MAIL' | 'SMS' | 'PAYMENT' | 'CALENDAR';
  }[];
}

const mockSettings: SocietySettings = {
  general: {
    name: "Prestige Falcon City",
    registrationNumber: "REG-2024-88902",
    address: "Kanakapura Road, Bangalore, Karnataka 560062",
    email: "admin@prestigefalcon.com",
    phone: "+91 98765 43210",
    website: "www.prestigefalcon.com",
    description: "A premium residential society with world-class amenities.",
    societyCode: "PFC-88902-XJ9"
  },
  branding: {
    logoUrl: "https://ui-avatars.com/api/?name=PF&background=72F1D1&color=fff",
    coverUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    primaryColor: "#72F1D1",
    secondaryColor: "#8F7CFF"
  },
  amenities: [
    { id: "A1", name: "Gymnasium", enabled: true, description: "Fully equipped fitness center" },
    { id: "A2", name: "Swimming Pool", enabled: true, description: "Olympic size pool" },
    { id: "A3", name: "Club House", enabled: true, description: "Indoor games and lounge" },
    { id: "A4", name: "Garden", enabled: true, description: "Landscaped walking park" },
    { id: "A5", name: "Guest Parking", enabled: false, description: "Designated visitor parking slots" },
    { id: "A6", name: "Community Hall", enabled: true, description: "Event space for 200 people" }
  ],
  maintenance: {
    dueDate: 5,
    lateFee: 500,
    penaltyPercentage: 2.5,
    reminderDays: 3,
    invoicePrefix: "PFC-MAINT-"
  },
  visitorRules: {
    allowedFrom: "06:00",
    allowedTo: "23:00",
    maxVisitorsPerFlat: 10,
    requireVehicleDetails: true,
    enableQrEntry: true,
    requireResidentApproval: true
  },
  notifications: {
    email: true,
    sms: true,
    push: true,
    maintenanceReminders: true,
    visitorAlerts: true,
    complaintAlerts: false
  },
  security: {
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordPolicy: "STRICT"
  },
  integrations: [
    { id: "I1", name: "SendGrid SMTP", status: "CONNECTED", lastSync: "Today, 10:30 AM", type: "MAIL" },
    { id: "I2", name: "Twilio SMS", status: "CONNECTED", lastSync: "Today, 11:15 AM", type: "SMS" },
    { id: "I3", name: "Razorpay", status: "CONNECTED", lastSync: "Yesterday, 04:00 PM", type: "PAYMENT" },
    { id: "I4", name: "Google Calendar", status: "DISCONNECTED", lastSync: "Never", type: "CALENDAR" }
  ]
};

class SettingsService {
  // TODO: Replace with Spring Boot REST API calls
  
  async getSettings(): Promise<SocietySettings> {
    return new Promise(resolve => setTimeout(() => resolve(mockSettings), 600));
  }

  async updateSettings(data: Partial<SocietySettings>): Promise<SocietySettings> {
    return new Promise(resolve => setTimeout(() => resolve({ ...mockSettings, ...data }), 800));
  }
}

export const settingsService = new SettingsService();
