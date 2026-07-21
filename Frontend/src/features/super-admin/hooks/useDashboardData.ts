import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";

export const useDashboardKPIs = () => {
  return useQuery({
    queryKey: ['dashboard', 'kpis'],
    queryFn: dashboardService.getKPIs,
  });
};

export const useDashboardAnalytics = () => {
  return useQuery({
    queryKey: ['dashboard', 'analytics'],
    queryFn: dashboardService.getAnalytics,
  });
};

export const usePendingApprovals = () => {
  return useQuery({
    queryKey: ['dashboard', 'approvals', 'pending'],
    queryFn: dashboardService.getPendingApprovals,
  });
};

export const useRecentActivity = () => {
  return useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: dashboardService.getRecentActivity,
  });
};

export const usePlatformHealth = () => {
  return useQuery({
    queryKey: ['dashboard', 'health'],
    queryFn: dashboardService.getPlatformHealth,
    // Typically platform health might be refetched frequently
    refetchInterval: 30000, 
  });
};
