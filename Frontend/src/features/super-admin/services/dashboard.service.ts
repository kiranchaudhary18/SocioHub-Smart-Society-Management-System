import { usersData, growthData, usersDistribution } from "../mock/analytics";
import { detailedPendingApprovals } from "../mock/approvals";
import { recentActivities } from "../mock/activities";
import { platformHealth } from "../mock/platformStatus";
import { kpiData } from "../mock/kpis";

/**
 * Dashboard Service
 * Provides methods to interact with the backend APIs.
 * Currently uses mock data.
 * 
 * TODO: Integrate with future Spring Boot APIs
 */
export const dashboardService = {
  // GET /api/v1/dashboard/kpis
  getKPIs: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(kpiData), 600));
  },

  // GET /api/v1/dashboard/analytics
  getAnalytics: async () => {
    return new Promise((resolve) => setTimeout(() => resolve({
      usersData: usersData,
      growth: growthData,
      users: usersDistribution,
    }), 800));
  },

  // GET /api/v1/dashboard/approvals/pending
  getPendingApprovals: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(detailedPendingApprovals), 700));
  },

  // GET /api/v1/dashboard/activity
  getRecentActivity: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(recentActivities), 500));
  },

  // GET /api/v1/dashboard/platform-status
  getPlatformHealth: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(platformHealth), 400));
  }
};
