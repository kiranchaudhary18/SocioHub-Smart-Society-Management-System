import { useState, useEffect } from "react";
import { reportsService } from "../../services/reports.service";
import type { KPIStats, GeneratedReport } from "../../services/reports.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { SectionCard } from "../../components/ui/SectionCard";
import { 
  BarChart3, PieChart, Activity, 
  Download, FileSpreadsheet, Filter, IndianRupee,
  Users, AlertTriangle, ShieldCheck, Wrench,
  CalendarDays, DownloadCloud, Trash2, RotateCcw
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line 
} from 'recharts';

const KPICard = ({ title, value, icon, trend, delay, prefix = "" }: { title: string, value: string | number, icon: React.ReactNode, trend: number, delay: number, prefix?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="min-w-[240px] flex-1 bg-white/60 backdrop-blur-xl border border-white/80 rounded-[24px] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:border-white transition-all flex flex-col justify-between"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${trend >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
      </div>
    </div>
    <div className="flex flex-col">
      <span className="text-2xl font-black text-slate-800 tracking-tight">{prefix}{typeof value === 'number' ? value.toLocaleString() : value}</span>
      <span className="text-xs font-bold text-slate-400 mt-1">{title}</span>
    </div>
  </motion.div>
);

export default function ReportsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [kpis, setKpis] = useState<KPIStats | null>(null);
  
  // Chart Data States
  const [finTrend, setFinTrend] = useState<any[]>([]);
  const [payDist, setPayDist] = useState<any[]>([]);
  const [, setRevBuild] = useState<any[]>([]);
  const [resDemo, setResDemo] = useState<any>(null);
  const [compAnalyt, setCompAnalyt] = useState<any>(null);
  const [visTrend, setVisTrend] = useState<any[]>([]);
  const [, setWorkAnalyt] = useState<any[]>([]);
  const [reports, setReports] = useState<GeneratedReport[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      const [
        kpiData, finData, payData, revData, resData, compData, visData, workData, repData
      ] = await Promise.all([
        reportsService.getKPIs(),
        reportsService.getFinancialTrend(),
        reportsService.getPaymentDistribution(),
        reportsService.getRevenueByBuilding(),
        reportsService.getResidentDemographics(),
        reportsService.getComplaintAnalytics(),
        reportsService.getVisitorTrend(),
        reportsService.getWorkforceAnalytics(),
        reportsService.getRecentReports()
      ]);
      
      setKpis(kpiData);
      setFinTrend(finData);
      setPayDist(payData);
      setRevBuild(revData);
      setResDemo(resData);
      setCompAnalyt(compData);
      setVisTrend(visData);
      setWorkAnalyt(workData);
      setReports(repData);
      setIsLoading(false);
    };
    fetchAllData();
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-md border border-slate-100 p-3 rounded-xl shadow-lg">
          <p className="text-sm font-bold text-slate-700 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-xs font-bold">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
              <span className="text-slate-500 capitalize">{entry.name}:</span>
              <span className="text-slate-800">{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col gap-6 p-4">
        <div className="h-12 w-1/3 bg-slate-100 rounded-xl animate-pulse" />
        <div className="flex gap-4 overflow-hidden">
          {[1,2,3,4].map(i => <div key={i} className="h-32 min-w-[240px] bg-slate-100 rounded-[24px] animate-pulse" />)}
        </div>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="h-[400px] bg-slate-100 rounded-[32px] animate-pulse" />
          <div className="h-[400px] bg-slate-100 rounded-[32px] animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 pb-12">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-tight flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-[#8F7CFF]" />
            Reports & Analytics
          </h1>
          <p className="text-slate-500 font-medium mt-1">Monitor society performance, financial health and operational insights.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ActionButton variant="outline" leftIcon={<FileSpreadsheet className="w-4 h-4" />}>Export Excel</ActionButton>
          <ActionButton variant="outline" leftIcon={<Download className="w-4 h-4" />}>Export PDF</ActionButton>
          <ActionButton variant="primary" leftIcon={<Activity className="w-4 h-4" />}>Generate Report</ActionButton>
        </div>
      </div>

      {/* Global Filter Bar */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[20px] p-2 flex flex-wrap items-center gap-2 relative z-20">
        <button className="flex items-center gap-2 px-4 py-2 rounded-[12px] bg-white border border-slate-100 hover:border-[#8F7CFF]/50 text-slate-600 font-bold text-sm transition-colors">
          <CalendarDays className="w-4 h-4 text-[#8F7CFF]" /> Year: 2026
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[12px] bg-white border border-slate-100 hover:border-[#8F7CFF]/50 text-slate-600 font-bold text-sm transition-colors">
          <Filter className="w-4 h-4 text-slate-400" /> Building: All
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[12px] bg-white border border-slate-100 hover:border-[#8F7CFF]/50 text-slate-600 font-bold text-sm transition-colors">
          <Users className="w-4 h-4 text-slate-400" /> Resident Type: All
        </button>
        <div className="flex-1" />
        <button className="flex items-center gap-2 px-4 py-2 rounded-[12px] hover:bg-slate-100 text-slate-500 font-bold text-sm transition-colors">
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>

      {/* KPI Ribbon */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
        <KPICard title="Total Residents" value={kpis!.totalResidents.value} trend={kpis!.totalResidents.trend} icon={<Users className="w-5 h-5 text-[#8F7CFF]" />} delay={0.1} />
        <KPICard title="Maintenance Collection" value={`${kpis!.maintenanceCollection.value}%`} trend={kpis!.maintenanceCollection.trend} icon={<IndianRupee className="w-5 h-5 text-[#72F1D1]" />} delay={0.15} />
        <KPICard title="Pending Dues" value={kpis!.pendingDues.value} prefix="₹" trend={kpis!.pendingDues.trend} icon={<AlertTriangle className="w-5 h-5 text-[#FF7A7A]" />} delay={0.2} />
        <KPICard title="Complaints Resolved" value={`${kpis!.complaintsResolved.value}%`} trend={kpis!.complaintsResolved.trend} icon={<Wrench className="w-5 h-5 text-[#FFD166]" />} delay={0.25} />
        <KPICard title="Visitor Count (MTD)" value={kpis!.visitorCount.value} trend={kpis!.visitorCount.trend} icon={<ShieldCheck className="w-5 h-5 text-[#3DD9FF]" />} delay={0.3} />
      </div>

      {/* Main BI Canvas (Bento Grid) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Section 1: Financial Analytics (Spans 2 cols) */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <SectionCard className="h-[420px] flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-[#72F1D1]" /> Financial Health & Collection Trend
            </h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={finTrend} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#72F1D1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#72F1D1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF7A7A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF7A7A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} tickFormatter={(val) => `₹${val/1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '20px' }} />
                  <Area type="monotone" dataKey="collected" name="Collected" stroke="#72F1D1" strokeWidth={3} fillOpacity={1} fill="url(#colorCollected)" />
                  <Area type="monotone" dataKey="pending" name="Pending" stroke="#FF7A7A" strokeWidth={3} fillOpacity={1} fill="url(#colorPending)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        {/* Payment Distribution (1 col) */}
        <SectionCard className="h-[420px] flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#8F7CFF]" /> Payment Methods
          </h3>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPieChart>
                <Pie
                  data={payDist}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {payDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </RechartsPieChart>
            </ResponsiveContainer>
            {/* Custom Legend */}
            <div className="w-full flex flex-col gap-3 mt-4">
              {payDist.map((entry, index) => (
                <div key={index} className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.fill }} />
                    <span className="text-sm font-bold text-slate-600">{entry.name}</span>
                  </div>
                  <span className="text-sm font-black text-slate-800">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Section 2: Operational Insights */}
        <SectionCard className="h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#3DD9FF]" /> Visitor Flow (Today)
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="visitors" name="Visitors" stroke="#3DD9FF" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard className="h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-[#FFD166]" /> Complaint Resolution Weekly
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compAnalyt?.trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '10px' }} />
                <Bar dataKey="new" name="New" fill="#FFD166" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="resolved" name="Resolved" fill="#72F1D1" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard className="h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#8F7CFF]" /> Building Occupancy
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resDemo?.occupancy} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} width={60} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                <Bar dataKey="occupied" name="Occupied %" stackId="a" fill="#8F7CFF" radius={[0, 0, 0, 0]} barSize={20} />
                <Bar dataKey="vacant" name="Vacant %" stackId="a" fill="#f1f5f9" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* Section 3: Bottom Full Width - Reports Center */}
        <div className="xl:col-span-3 grid grid-cols-1 xl:grid-cols-4 gap-6">
          
          <SectionCard className="xl:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#72F1D1]" /> Recent Reports
              </h3>
              <button className="text-sm font-bold text-[#8F7CFF] hover:underline">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <th className="px-4 py-4 whitespace-nowrap">Report Name</th>
                    <th className="px-4 py-4 whitespace-nowrap">Type</th>
                    <th className="px-4 py-4 whitespace-nowrap">Generated By</th>
                    <th className="px-4 py-4 whitespace-nowrap">Date</th>
                    <th className="px-4 py-4 whitespace-nowrap text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                            <FileSpreadsheet className="w-4 h-4 text-slate-400" />
                          </div>
                          <span className="font-bold text-slate-700">{report.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-2 py-1 rounded-md">{report.type}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-bold text-slate-600">{report.generatedBy}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-medium text-slate-500">{report.generatedDate}</span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {report.status === 'READY' ? (
                            <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-[#8F7CFF] hover:text-[#8F7CFF] flex items-center justify-center text-slate-400 transition-all shadow-sm">
                              <DownloadCloud className="w-4 h-4" />
                            </button>
                          ) : (
                            <span className="text-xs font-bold text-amber-500 mr-2">Generating...</span>
                          )}
                          <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-red-500 hover:text-red-500 flex items-center justify-center text-slate-400 transition-all shadow-sm">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <div className="flex flex-col gap-6">
            <SectionCard>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#FFD166]" /> Quick Insights
              </h3>
              <div className="flex flex-col gap-4">
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <p className="text-sm font-bold text-emerald-800 leading-tight">Maintenance collection is up 4.2% compared to last month.</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
                  <p className="text-sm font-bold text-amber-800 leading-tight">Visitor traffic peaked at 18:00 today. Recommend additional security deployment.</p>
                </div>
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl">
                  <p className="text-sm font-bold text-indigo-800 leading-tight">Block B has the highest pending dues (₹1.2L).</p>
                </div>
              </div>
            </SectionCard>
          </div>

        </div>

      </div>
    </div>
  );
}
