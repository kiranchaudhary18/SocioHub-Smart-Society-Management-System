export interface ResidentProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  alternateNumber: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  bloodGroup: string;
  nationality: string;
  languagePreference: string;
  residentSince: string;
  isVerified: boolean;
  memberStatus: "ACTIVE" | "PENDING" | "SUSPENDED";
  role: "OWNER" | "TENANT" | "FAMILY_MEMBER";
}

export interface ResidenceInfo {
  societyName: string;
  building: string;
  wing: string;
  flatNumber: string;
  floor: string;
  ownershipStatus: string;
  moveInDate: string;
  parkingSlot: string;
  familyMembersCount: number;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
  email: string;
  address: string;
}

export interface NotificationPreferences {
  maintenanceUpdates: boolean;
  visitorNotifications: boolean;
  complaintUpdates: boolean;
  paymentReminders: boolean;
  eventNotifications: boolean;
  emergencyAlerts: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}

export interface PrivacySettings {
  showContactNumber: boolean;
  showEmail: boolean;
  showBirthday: boolean;
  allowEventInvitations: boolean;
  allowCommunityMessages: boolean;
  profileVisibility: "PUBLIC" | "SOCIETY_ONLY" | "ADMIN_ONLY";
}

export interface SecurityDetails {
  passwordStatus: "STRONG" | "WEAK" | "EXPIRED";
  lastPasswordChange: string;
  twoFactorEnabled: boolean;
  activeDevices: number;
  lastLogin: string;
  loginLocation: string;
}

export interface AccountActivity {
  id: string;
  type: "LOGIN" | "PASSWORD" | "PROFILE" | "VISITOR" | "PAYMENT" | "COMPLAINT" | "DOWNLOAD";
  title: string;
  description: string;
  date: string;
  time: string;
}

export interface ProfileCompletion {
  percentage: number;
  suggestions: string[];
}

let mockProfile: ResidentProfile = {
  id: "RES-2026-9042",
  firstName: "Arjun",
  lastName: "Sharma",
  email: "arjun.sharma@example.com",
  mobileNumber: "+91 98765 43210",
  alternateNumber: "+91 87654 32109",
  dateOfBirth: "1988-05-14",
  gender: "Male",
  occupation: "Software Engineer",
  bloodGroup: "O+",
  nationality: "Indian",
  languagePreference: "English",
  residentSince: "2024-03-01",
  isVerified: true,
  memberStatus: "ACTIVE",
  role: "OWNER"
};

const mockResidenceInfo: ResidenceInfo = {
  societyName: "SocioHub Residency",
  building: "Orchid Tower",
  wing: "B",
  flatNumber: "1402",
  floor: "14th",
  ownershipStatus: "Self Owned",
  moveInDate: "2024-03-15",
  parkingSlot: "B2-45 (Basement 2)",
  familyMembersCount: 3
};

let mockEmergencyContact: EmergencyContact = {
  name: "Priya Sharma",
  relationship: "Spouse",
  phoneNumber: "+91 76543 21098",
  email: "priya.sharma@example.com",
  address: "B-1402, Orchid Tower, SocioHub Residency"
};

let mockPreferences: NotificationPreferences = {
  maintenanceUpdates: true,
  visitorNotifications: true,
  complaintUpdates: true,
  paymentReminders: true,
  eventNotifications: false,
  emergencyAlerts: true,
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true
};

let mockPrivacy: PrivacySettings = {
  showContactNumber: false,
  showEmail: false,
  showBirthday: true,
  allowEventInvitations: true,
  allowCommunityMessages: true,
  profileVisibility: "SOCIETY_ONLY"
};

const mockSecurity: SecurityDetails = {
  passwordStatus: "STRONG",
  lastPasswordChange: "2026-06-15T10:30:00Z",
  twoFactorEnabled: false,
  activeDevices: 2,
  lastLogin: "2026-07-22T08:45:00Z",
  loginLocation: "Mumbai, Maharashtra, India (IP: 103.45.67.89)"
};

const mockActivity: AccountActivity[] = [
  { id: "act-1", type: "LOGIN", title: "Successful Login", description: "Logged in from Chrome on Mac OS", date: "2026-07-22", time: "08:45 AM" },
  { id: "act-2", type: "VISITOR", title: "Visitor Pass Generated", description: "Generated pass for Delivery Executive", date: "2026-07-21", time: "02:30 PM" },
  { id: "act-3", type: "DOWNLOAD", title: "Document Downloaded", description: "Downloaded AGM Minutes 2025.pdf", date: "2026-07-20", time: "11:15 AM" },
  { id: "act-4", type: "PAYMENT", title: "Maintenance Paid", description: "Paid Q3 2026 Maintenance Bill via UPI", date: "2026-07-05", time: "09:00 AM" },
  { id: "act-5", type: "PASSWORD", title: "Password Updated", description: "Successfully changed account password", date: "2026-06-15", time: "10:30 AM" }
];

const mockCompletion: ProfileCompletion = {
  percentage: 85,
  suggestions: [
    "Upload Profile Photo",
    "Enable Two Factor Authentication",
    "Add alternate mobile number"
  ]
};

class ProfileService {
  async getProfile(): Promise<{
    profile: ResidentProfile;
    residence: ResidenceInfo;
    emergency: EmergencyContact;
    preferences: NotificationPreferences;
    privacy: PrivacySettings;
    security: SecurityDetails;
    activity: AccountActivity[];
    completion: ProfileCompletion;
  }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          profile: { ...mockProfile },
          residence: { ...mockResidenceInfo },
          emergency: { ...mockEmergencyContact },
          preferences: { ...mockPreferences },
          privacy: { ...mockPrivacy },
          security: { ...mockSecurity },
          activity: [...mockActivity],
          completion: { ...mockCompletion }
        });
      }, 800);
    });
  }

  async updatePersonalInfo(data: Partial<ResidentProfile>): Promise<ResidentProfile> {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockProfile = { ...mockProfile, ...data };
        resolve({ ...mockProfile });
      }, 600);
    });
  }

  async updateEmergencyContact(data: EmergencyContact): Promise<EmergencyContact> {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockEmergencyContact = { ...data };
        resolve({ ...mockEmergencyContact });
      }, 500);
    });
  }

  async updatePreferences(key: keyof NotificationPreferences, value: boolean): Promise<NotificationPreferences> {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockPreferences = { ...mockPreferences, [key]: value };
        resolve({ ...mockPreferences });
      }, 300);
    });
  }

  async updatePrivacy(key: keyof PrivacySettings, value: any): Promise<PrivacySettings> {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockPrivacy = { ...mockPrivacy, [key]: value };
        resolve({ ...mockPrivacy });
      }, 300);
    });
  }
}

export const profileService = new ProfileService();
