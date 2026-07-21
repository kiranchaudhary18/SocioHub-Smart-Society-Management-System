import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";

export const useDashboardKPIs = () => {
  return useQuery({
    queryKey: ['dashboard', 'kpis'],
    queryFn: dashboardService.getKPIs as () => Promise<any>,
  });
};

export const useDashboardAnalytics = () => {
  return useQuery({
    queryKey: ['dashboard', 'analytics'],
    queryFn: dashboardService.getAnalytics as () => Promise<any>,
  });
};

export const usePendingApprovals = () => {
  return useQuery({
    queryKey: ['dashboard', 'approvals', 'pending'],
    queryFn: dashboardService.getPendingApprovals as () => Promise<any[]>,
  });
};

export const useRecentActivity = () => {
  return useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: dashboardService.getRecentActivity as () => Promise<any[]>,
  });
};

export const usePlatformHealth = () => {
  return useQuery({
    queryKey: ['dashboard', 'health'],
    queryFn: dashboardService.getPlatformHealth as () => Promise<any>,
    // Typically platform health might be refetched frequently
    refetchInterval: 30000, 
  });
};
