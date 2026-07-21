import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useDashboardAnalytics } from "../../hooks/useDashboardData";

export function AnalyticsSection() {
  const { data: analytics, isLoading } = useDashboardAnalytics();

  if (isLoading || !analytics) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="h-[400px] bg-white/40 backdrop-blur-md rounded-[32px] animate-pulse" />
        <div className="h-[400px] bg-white/40 backdrop-blur-md rounded-[32px] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
      
      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
      >
        <div className="mb-6">
          <h3 className="text-xl font-heading font-extrabold text-slate-800">Revenue Growth</h3>
          <p className="text-sm font-medium text-slate-500">Monthly recurring revenue (MRR)</p>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics.revenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#72F1D1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#72F1D1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(val) => `$${val/1000}k`} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}
                itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#72F1D1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Society Growth Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
      >
        <div className="mb-6">
          <h3 className="text-xl font-heading font-extrabold text-slate-800">Platform Adoption</h3>
          <p className="text-sm font-medium text-slate-500">New societies onboarded this month</p>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.growth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: 'rgba(143,124,255,0.05)' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}
                itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
              />
              <Bar dataKey="societies" fill="#8F7CFF" radius={[8, 8, 8, 8]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

    </div>
  );
}
