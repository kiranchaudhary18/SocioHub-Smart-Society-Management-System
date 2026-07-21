import { SectionCard } from "../../../components/ui/SectionCard";
import type { DashboardStats } from "../../../services/dashboard.service";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";
import { motion } from "framer-motion";

interface VisitorChartWidgetProps {
  visitors: DashboardStats['visitors'];
  delay?: number;
}

export function VisitorChartWidget({ visitors, delay = 0 }: VisitorChartWidgetProps) {
  return (
    <SectionCard delay={delay} className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800">Visitor Traffic</h3>
        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">Today</span>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="flex flex-col">
          <span className="text-3xl font-heading font-black text-slate-800">{visitors.today}</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Total Expected</span>
        </div>
        <div className="w-px h-10 bg-slate-100" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-500">Approved ({visitors.approved})</span>
            <span className="text-emerald-500">{Math.round((visitors.approved/visitors.today)*100)}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#72F1D1]" 
              style={{ width: `${(visitors.approved/visitors.today)*100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="h-[120px] w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={visitors.hourlyData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8F7CFF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8F7CFF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              cursor={{ stroke: '#8F7CFF', strokeWidth: 1, strokeDasharray: '4 4' }}
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
            />
            <XAxis dataKey="time" hide />
            <Area 
              type="monotone" 
              dataKey="count" 
              stroke="#8F7CFF" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorCount)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
