export interface PlatformSettings {
  general: {
    platformName: string;
    contactEmail: string;
    supportPhone: string;
    timezone: string;
  };
  smtp: {
    host: string;
    port: string;
    username: string;
    fromEmail: string;
  };
  security: {
    mfaRequired: boolean;
    passwordExpiryDays: number;
    maxLoginAttempts: number;
  };
  maintenance: {
    isMaintenanceMode: boolean;
    message: string;
    allowSuperAdmins: boolean;
  };
}

export const mockSettings: PlatformSettings = {
  general: {
    platformName: "SocioHub Platform",
    contactEmail: "admin@sociohub.com",
    supportPhone: "+1-800-SOCIOHUB",
    timezone: "UTC+5:30",
  },
  smtp: {
    host: "smtp.mailgun.org",
    port: "587",
    username: "postmaster@mg.sociohub.com",
    fromEmail: "noreply@sociohub.com",
  },
  security: {
    mfaRequired: true,
    passwordExpiryDays: 90,
    maxLoginAttempts: 5,
  },
  maintenance: {
    isMaintenanceMode: false,
    message: "We are currently undergoing scheduled maintenance. Please check back later.",
    allowSuperAdmins: true,
  }
};

export const systemHealthData = {
  status: "Healthy",
  uptime: "99.99%",
  lastBackup: "Today at 03:00 AM",
  storageUsed: "450 GB",
  storageTotal: "1 TB",
  databaseLoad: "12%",
  activeSessions: 1420
};
