import { SectionCard } from "../../../components/ui/SectionCard";
import type { DashboardStats } from "../../../services/dashboard.service";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, CartesianGrid } from "recharts";

interface MaintenanceChartWidgetProps {
  maintenance: DashboardStats['maintenance'];
  delay?: number;
}

export function MaintenanceChartWidget({ maintenance, delay = 0 }: MaintenanceChartWidgetProps) {
  return (
    <SectionCard delay={delay} className="flex flex-col col-span-1 lg:col-span-2 min-h-[350px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Maintenance Collection</h3>
          <p className="text-sm font-medium text-slate-500 mt-1">Monthly collection vs pending dues</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-500">Collected</span>
            <span className="text-lg font-black text-[#72F1D1]">₹{(maintenance.paidAmount/100000).toFixed(1)}L</span>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-500">Pending</span>
            <span className="text-lg font-black text-[#FF7A7A]">₹{(maintenance.pendingAmount/100000).toFixed(1)}L</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={maintenance.monthlyData} margin={{ top: 10, right: 0, left: 0, bottom: 20 }} barSize={24}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }} dy={10} />
            <Tooltip 
              cursor={{ fill: '#F1F5F9' }}
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
              formatter={(value: any) => `₹${value.toLocaleString()}`}
            />
            <Bar dataKey="collected" stackId="a" fill="#72F1D1" radius={[0, 0, 8, 8]} />
            <Bar dataKey="pending" stackId="a" fill="#FF7A7A" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#72F1D1]" />
          <span className="text-xs font-bold text-slate-500 uppercase">Collected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF7A7A]" />
          <span className="text-xs font-bold text-slate-500 uppercase">Pending</span>
        </div>
      </div>
    </SectionCard>
  );
}
