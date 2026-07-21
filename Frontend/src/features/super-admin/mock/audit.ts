export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export interface AuditEvent {
  id: string;
  action: string;
  module: string;
  actor: {
    name: string;
    role: string;
    avatar?: string;
  };
  society?: string;
  timestamp: string;
  ip: string;
  browser: string;
  location: string;
  riskLevel: RiskLevel;
  details: {
    request: any;
    response: any;
    affectedRecords: string[];
  };
}

export const auditKPIs = {
  todayLogs: { value: 12450, trend: "+12%", positive: false },
  failedLogins: { value: 45, trend: "-5", positive: true },
  deletedRecords: { value: 12, trend: "0", positive: true },
  adminActions: { value: 432, trend: "+15", positive: false },
};

export const securityAlerts = [
  { id: 1, title: "Multiple Failed Logins", description: "5 failed attempts from IP 192.168.1.45 in Bengaluru", time: "10 mins ago", severity: "High" },
  { id: 2, title: "Unusual Download Activity", description: "User Amit Shah downloaded 500+ records", time: "2 hours ago", severity: "Medium" },
  { id: 3, title: "Admin Login from New Location", description: "Login detected from Dubai, UAE", time: "5 hours ago", severity: "Critical" },
];

export const mockAuditLogs: AuditEvent[] = [
  {
    id: "AUD-88492",
    action: "Deleted User Account",
    module: "User Management",
    actor: {
      name: "Kiran Chaudhary",
      role: "Super Admin",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Felix&backgroundColor=transparent"
    },
    society: "System",
    timestamp: "2026-07-21T11:20:00Z",
    ip: "103.45.67.89",
    browser: "Chrome on macOS",
    location: "Bengaluru, India",
    riskLevel: "High",
    details: {
      request: {
        userId: "USR-4421",
        reason: "Violation of terms",
        forceDelete: true
      },
      response: {
        status: "success",
        deletedAt: "2026-07-21T11:20:01Z"
      },
      affectedRecords: ["users/USR-4421", "auth/sessions/USR-4421"]
    }
  },
  {
    id: "AUD-88491",
    action: "Exported Society Report",
    module: "Analytics",
    actor: {
      name: "Amit Shah",
      role: "Society Admin",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Amit&backgroundColor=transparent"
    },
    society: "Green Valley Apartments",
    timestamp: "2026-07-21T10:45:00Z",
    ip: "122.164.12.5",
    browser: "Safari on iOS",
    location: "Bengaluru, India",
    riskLevel: "Low",
    details: {
      request: {
        reportType: "monthly_maintenance",
        format: "csv",
        dateRange: "2026-06-01 to 2026-06-30"
      },
      response: {
        status: "success",
        fileSize: "2.4MB"
      },
      affectedRecords: []
    }
  },
  {
    id: "AUD-88490",
    action: "Failed Login Attempt",
    module: "Authentication",
    actor: {
      name: "Unknown User",
      role: "Guest",
    },
    timestamp: "2026-07-21T09:15:00Z",
    ip: "45.22.11.99",
    browser: "Firefox on Windows",
    location: "Moscow, Russia",
    riskLevel: "Critical",
    details: {
      request: {
        email: "admin@sociohub.com",
        attemptCount: 4
      },
      response: {
        status: "error",
        error: "Invalid credentials",
        lockoutTriggered: false
      },
      affectedRecords: []
    }
  },
  {
    id: "AUD-88489",
    action: "Updated Subscription Plan",
    module: "Billing",
    actor: {
      name: "Neha Patil",
      role: "Society Admin",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Neha&backgroundColor=transparent"
    },
    society: "Blue Ridge Residency",
    timestamp: "2026-07-20T16:30:00Z",
    ip: "103.45.67.89",
    browser: "Edge on Windows",
    location: "Pune, India",
    riskLevel: "Medium",
    details: {
      request: {
        societyId: "SOC-002",
        oldPlan: "Starter",
        newPlan: "Premium",
        billingCycle: "Annual"
      },
      response: {
        status: "success",
        transactionId: "TXN-998123"
      },
      affectedRecords: ["societies/SOC-002/billing"]
    }
  }
];
