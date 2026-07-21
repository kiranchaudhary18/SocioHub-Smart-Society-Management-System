import { useQuery } from "@tanstack/react-query";
import { CMSService } from "../services/cms.service";
import type { CMSContent } from "../mock/cms";

export function useCMSPages() {
  return useQuery({
    queryKey: ['super-admin', 'cms', 'pages'],
    queryFn: CMSService.getAllPages as () => Promise<CMSContent[]>
  });
}

export function useCMSKPIs() {
  return useQuery({
    queryKey: ['super-admin', 'cms', 'kpis'],
    queryFn: CMSService.getKPIs as () => Promise<any>
  });
}
