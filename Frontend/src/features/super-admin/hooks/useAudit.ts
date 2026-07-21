import { useQuery } from "@tanstack/react-query";
import { AuditService } from "../services/audit.service";
import type { AuditEvent } from "../mock/audit";

export function useAuditLogs() {
  return useQuery({
    queryKey: ['super-admin', 'audit', 'logs'],
    queryFn: AuditService.getAllLogs as () => Promise<AuditEvent[]>
  });
}

export function useAuditKPIs() {
  return useQuery({
    queryKey: ['super-admin', 'audit', 'kpis'],
    queryFn: AuditService.getKPIs as () => Promise<any>
  });
}

export function useSecurityAlerts() {
  return useQuery({
    queryKey: ['super-admin', 'audit', 'alerts'],
    queryFn: AuditService.getSecurityAlerts as () => Promise<any[]>
  });
}
