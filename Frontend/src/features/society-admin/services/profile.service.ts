export interface ProfileSettings {
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    avatarUrl: string;
  };
  professional: {
    role: string;
    societyName: string;
    experience: string;
    memberSince: string;
    verificationStatus: 'VERIFIED' | 'PENDING' | 'UNVERIFIED';
  };
  security: {
    twoFactorEnabled: boolean;
    recoveryEmail: string;
    recoveryPhone: string;
    lastPasswordChange: string;
  };
  preferences: {
    language: string;
    timezone: string;
    dateFormat: string;
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
  };
  sessions: {
    id: string;
    device: string;
    browser: string;
    location: string;
    ipAddress: string;
    lastActive: string;
    isCurrent: boolean;
  }[];
}

const mockProfile: ProfileSettings = {
  personal: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    dateOfBirth: "1985-08-15",
    address: "Block A, Flat 402, Prestige Falcon City",
    avatarUrl: "https://ui-avatars.com/api/?name=John+Doe&background=8F7CFF&color=fff"
  },
  professional: {
    role: "Society Secretary",
    societyName: "Prestige Falcon City",
    experience: "4 Years in Society Management",
    memberSince: "March 2022",
    verificationStatus: 'VERIFIED'
  },
  security: {
    twoFactorEnabled: true,
    recoveryEmail: "john.recovery@example.com",
    recoveryPhone: "+91 98765 00000",
    lastPasswordChange: "2 Months Ago"
  },
  preferences: {
    language: "English (US)",
    timezone: "Asia/Kolkata (IST)",
    dateFormat: "DD/MM/YYYY",
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true
  },
  sessions: [
    {
      id: "SESS-001",
      device: "MacBook Pro M2",
      browser: "Chrome 120.0",
      location: "Bangalore, India",
      ipAddress: "192.168.1.104",
      lastActive: "Just now",
      isCurrent: true
    },
    {
      id: "SESS-002",
      device: "iPhone 14 Pro",
      browser: "Safari Mobile",
      location: "Bangalore, India",
      ipAddress: "117.200.45.12",
      lastActive: "2 hours ago",
      isCurrent: false
    }
  ]
};

class ProfileService {
  // TODO: Replace with Spring Boot REST API calls
  
  async getProfile(): Promise<ProfileSettings> {
    return new Promise(resolve => setTimeout(() => resolve(mockProfile), 500));
  }

  async updateProfile(data: Partial<ProfileSettings>): Promise<ProfileSettings> {
    return new Promise(resolve => setTimeout(() => resolve({ ...mockProfile, ...data }), 800));
  }
}

export const profileService = new ProfileService();
