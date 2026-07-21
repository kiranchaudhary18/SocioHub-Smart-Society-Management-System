import { motion } from "framer-motion";
import { 
  Download, FileText, Calendar, 
  TrendingUp, TrendingDown, Users, Building2, 
  Eye, CheckCircle2, AlertTriangle
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { analyticsKPIs, growthData, cityDistribution, platformUsage } from "../mock/analyticsData";

const COLORS = ['#8F7CFF', '#3DD9FF', '#72F1D1', '#FFD166', '#FF7A7A'];

export default function AnalyticsPage() {
  const kpiCards = [
    { title: "Active Societies", value: analyticsKPIs.activeSocieties.value, trend: analyticsKPIs.activeSocieties.trend, positive: analyticsKPIs.activeSocieties.positive, icon: Building2, color: "text-[#8F7CFF]", bg: "bg-[#8F7CFF]/10" },
    { title: "Active Users", value: analyticsKPIs.activeUsers.value.toLocaleString(), trend: analyticsKPIs.activeUsers.trend, positive: analyticsKPIs.activeUsers.positive, icon: Users, color: "text-[#72F1D1]", bg: "bg-[#72F1D1]/10" },
    { title: "Complaints Resolved", value: `${analyticsKPIs.complaintsResolved.value}%`, trend: analyticsKPIs.complaintsResolved.trend, positive: analyticsKPIs.complaintsResolved.positive, icon: CheckCircle2, color: "text-[#3DD9FF]", bg: "bg-[#3DD9FF]/10" },
    { title: "Visitor Traffic", value: analyticsKPIs.visitorTraffic.value.toLocaleString(), trend: analyticsKPIs.visitorTraffic.trend, positive: analyticsKPIs.visitorTraffic.positive, icon: Eye, color: "text-[#FF7A7A]", bg: "bg-[#FF7A7A]/10" },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-8 flex flex-col h-full gap-8">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight mb-2">
            Analytics & Reports
          </h1>
          <p className="text-slate-500 font-medium text-base">
            Track platform growth, user engagement, and operational insights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:bg-white transition-colors text-sm font-bold text-slate-700">
            <Calendar className="w-4 h-4 text-slate-400" />
            Schedule Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:bg-white transition-colors text-sm font-bold text-slate-700">
            <Download className="w-4 h-4 text-[#8F7CFF]" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#72F1D1] to-[#3DD9FF] hover:opacity-90 transition-opacity text-sm font-bold text-slate-900 shadow-lg shadow-[#72F1D1]/30">
            <FileText className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </motion.div>

      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-8">
          
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(143,124,255,0.08)] transition-all duration-300 relative overflow-hidden group"
              >
                <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${card.bg} blur-2xl group-hover:blur-3xl transition-all duration-500`} />
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center`}>
                    <card.icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${card.positive ? 'bg-[#72F1D1]/20 text-teal-700' : 'bg-[#FF7A7A]/10 text-[#FF7A7A]'}`}>
                    {card.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{card.trend}</span>
                  </div>
                </div>
                <div className="relative z-10">
                  <h4 className="text-sm font-bold text-slate-400 mb-1">{card.title}</h4>
                  <div className="text-3xl font-heading font-black text-slate-800">{card.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Growth */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] col-span-1 lg:col-span-2"
            >
              <h3 className="text-lg font-bold text-slate-800 mb-6">User & Society Growth</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8F7CFF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8F7CFF" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorSocieties" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3DD9FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3DD9FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                      itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Area yAxisId="left" type="monotone" dataKey="users" stroke="#8F7CFF" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                    <Area yAxisId="right" type="monotone" dataKey="societies" stroke="#3DD9FF" strokeWidth={3} fillOpacity={1} fill="url(#colorSocieties)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Platform Usage */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
            >
              <h3 className="text-lg font-bold text-slate-800 mb-6">Platform Usage</h3>
              <div className="h-[250px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformUsage}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {platformUsage.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {platformUsage.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-xs font-bold text-slate-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* City Distribution */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
            >
              <h3 className="text-lg font-bold text-slate-800 mb-6">City-wise Distribution</h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cityDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} width={80} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
                      cursor={{ fill: 'rgba(143,124,255,0.05)' }}
                    />
                    <Bar dataKey="value" fill="#72F1D1" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="w-full xl:w-[350px] shrink-0 flex flex-col gap-6">
          
          {/* AI Insights */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#8F7CFF] to-[#3DD9FF] rounded-[32px] p-6 shadow-lg shadow-[#8F7CFF]/20 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
            <h3 className="text-lg font-heading font-extrabold mb-6 flex items-center gap-2 relative z-10">
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">✨</span>
              AI Insights
            </h3>
            
            <div className="space-y-4 relative z-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                <p className="text-sm font-medium leading-relaxed">Platform engagement increased by <span className="font-bold text-white">18%</span> this month, driven by new resident onboarding.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                <p className="text-sm font-medium leading-relaxed">Visitor traffic is <span className="font-bold text-white">12% higher</span> this week in Bengaluru societies.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                <p className="text-sm font-medium leading-relaxed">Complaint resolution speed improved by <span className="font-bold text-white">2.5 hours</span> average.</p>
              </div>
            </div>
          </motion.div>

          {/* Report Center */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-6">Report Center</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white transition-colors group border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#8F7CFF]/10 group-hover:text-[#8F7CFF] transition-colors">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm text-slate-700 group-hover:text-[#8F7CFF] transition-colors">User Report</span>
                </div>
                <Download className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white transition-colors group border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#3DD9FF]/10 group-hover:text-[#3DD9FF] transition-colors">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm text-slate-700 group-hover:text-[#3DD9FF] transition-colors">Society Report</span>
                </div>
                <Download className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white transition-colors group border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#FF7A7A]/10 group-hover:text-[#FF7A7A] transition-colors">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm text-slate-700 group-hover:text-[#FF7A7A] transition-colors">Complaint Report</span>
                </div>
                <Download className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
