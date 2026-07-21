import { useQuery } from "@tanstack/react-query";
import { SupportService } from "../services/support.service";
import type { SupportTicket } from "../mock/support";

export function useSupportTickets() {
  return useQuery({
    queryKey: ['super-admin', 'support'],
    queryFn: SupportService.getAllTickets as () => Promise<SupportTicket[]>
  });
}

export function useSupportKPIs() {
  return useQuery({
    queryKey: ['super-admin', 'support', 'kpis'],
    queryFn: SupportService.getKPIs as () => Promise<any>
  });
}
