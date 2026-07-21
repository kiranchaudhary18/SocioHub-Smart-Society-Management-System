import { mockAuditLogs, auditKPIs, securityAlerts } from "../mock/audit";

export const AuditService = {
  getKPIs: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(auditKPIs), 300));
  },

  getAllLogs: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(mockAuditLogs), 500));
  },
  
  getSecurityAlerts: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(securityAlerts), 400));
  }
};
