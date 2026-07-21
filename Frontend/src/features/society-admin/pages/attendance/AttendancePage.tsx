import { useState, useEffect } from "react";
import { attendanceService } from "../../services/attendance.service";
import type { AttendanceRecord, AttendanceStats } from "../../services/attendance.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatCard } from "../../components/ui/StatCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { SectionCard } from "../../components/ui/SectionCard";
import { 
  CalendarClock, UserCheck, UserX, Clock, AlertTriangle, 
  Download, Search, Filter, MoreVertical, MapPin, CheckCircle2, History
} from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState<AttendanceStats | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [recordsData, statsData, chartD] = await Promise.all([
        attendanceService.getAttendanceRecords(),
        attendanceService.getStats(),
        attendanceService.getTrendData()
      ]);
      setRecords(recordsData);
      setStats(statsData);
      setChartData(chartD as any[]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredRecords = records.filter(r => 
    `${r.name} ${r.employeeId} ${r.role} ${r.department}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "PRESENT": return "success";
      case "ABSENT": return "danger";
      case "LATE": return "warning";
      case "HALF_DAY": return "info";
      case "ON_LEAVE": return "neutral";
      default: return "neutral";
    }
  };

  return (
    <div className="w-full flex h-full relative gap-6">
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col">
            <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Attendance</h1>
            <p className="text-slate-500 font-medium mt-1">Monitor daily attendance, shifts, and leaves.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ActionButton variant="outline" leftIcon={<Download className="w-4 h-4" />}>Export Report</ActionButton>
            <ActionButton variant="primary" leftIcon={<UserCheck className="w-4 h-4" />}>Mark Attendance</ActionButton>
          </div>
        </div>

        {/* Overview Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            <StatCard title="Present" value={stats.present} icon={<UserCheck className="w-5 h-5 text-[#72F1D1]" />} delay={0.1} trend={{ value: 5, isPositive: true }} />
            <StatCard title="Absent" value={stats.absent} icon={<UserX className="w-5 h-5 text-[#FF7A7A]" />} delay={0.15} />
            <StatCard title="Late" value={stats.late} icon={<Clock className="w-5 h-5 text-[#FFD166]" />} delay={0.2} trend={{ value: -2, isPositive: false }} />
            <StatCard title="On Leave" value={stats.onLeave} icon={<AlertTriangle className="w-5 h-5 text-slate-400" />} delay={0.25} />
            <StatCard title="Half Day" value={stats.halfDay} icon={<History className="w-5 h-5 text-[#3DD9FF]" />} delay={0.3} />
          </div>
        )}

        {/* Analytics Chart */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] p-6 h-[350px]">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-[#8F7CFF]" /> Weekly Attendance Trend
          </h3>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#72F1D1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#72F1D1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFD166" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FFD166" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold' }} 
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '20px' }} />
              <Area type="monotone" dataKey="present" name="Present" stroke="#72F1D1" strokeWidth={3} fillOpacity={1} fill="url(#colorPresent)" />
              <Area type="monotone" dataKey="late" name="Late/Half Day" stroke="#FFD166" strokeWidth={3} fillOpacity={1} fill="url(#colorLate)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Toolbar */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[24px] p-2 flex flex-col md:flex-row items-center gap-2">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-[16px] border border-slate-100 w-full">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Search by name, ID, role or department..." 
              className="w-full bg-transparent outline-none text-slate-700 font-medium placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 rounded-[16px] bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors border border-slate-100 w-full md:w-auto">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Table */}
        <div className="w-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-5 whitespace-nowrap">Employee</th>
                  <th className="px-6 py-5 whitespace-nowrap">Shift & Dept</th>
                  <th className="px-6 py-5 whitespace-nowrap">Check In/Out</th>
                  <th className="px-6 py-5 whitespace-nowrap">Hours</th>
                  <th className="px-6 py-5 whitespace-nowrap">Status</th>
                  <th className="px-6 py-5 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="p-6">
                      <div className="flex flex-col gap-2">
                        {[1, 2, 3].map(i => <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse" />)}
                      </div>
                    </td>
                  </tr>
                ) : filteredRecords.map((record, i) => (
                  <motion.tr 
                    key={record.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="group border-b border-slate-50 hover:bg-white transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800">{record.name}</span>
                        <span className="text-[10px] font-black tracking-wider text-slate-400 mt-0.5">{record.employeeId} • {record.role}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-bold text-slate-700">{record.shift}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                          {record.department}
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      {(record.checkIn || record.checkOut) ? (
                        <div className="flex flex-col">
                          {record.checkIn && <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#72F1D1]" /> {record.checkIn}</span>}
                          {record.checkOut ? (
                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mt-0.5"><MapPin className="w-3 h-3 text-slate-300" /> {record.checkOut}</span>
                          ) : (
                            <span className="text-[10px] font-bold text-[#FFD166] mt-0.5">Active Shift</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-slate-300">-</span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-black text-slate-600">{record.workingHours || '-'}</span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge variant={getStatusVariant(record.status) as any}>
                        {record.status.replace('_', ' ')}
                      </StatusBadge>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 inline-flex items-center justify-center text-slate-400 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Right Panel */}
      <div className="hidden xl:flex w-80 flex-col gap-6">
        <SectionCard className="sticky top-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <History className="w-5 h-5 text-[#8F7CFF]" /> Today's Workforce
          </h3>
          
          <div className="flex flex-col gap-4">
            
            <div className="flex flex-col gap-3">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Pending Leave Requests</span>
              
              <div className="bg-[#FFD166]/10 border border-[#FFD166]/20 p-3 rounded-xl flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white shrink-0 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-[#FFD166]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-slate-800">Sick Leave</span>
                  <span className="text-xs font-medium text-slate-500">Amit Yadav (Guard)</span>
                  <div className="flex items-center gap-2 mt-2">
                    <button className="text-[10px] font-bold px-2 py-1 bg-[#72F1D1] text-emerald-900 rounded-md">Approve</button>
                    <button className="text-[10px] font-bold px-2 py-1 bg-white text-slate-600 rounded-md">Reject</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-slate-100" />

            <div className="flex flex-col gap-3">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Late Arrivals</span>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <img src="https://ui-avatars.com/api/?name=Sunita+Devi&background=f8fafc&color=94a3b8" alt="Sunita" className="w-8 h-8 rounded-lg" />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-slate-700">Sunita Devi</span>
                    <span className="text-[10px] font-bold text-slate-400">15 mins late</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#FFD166]">07:15 AM</span>
              </div>
            </div>

            <div className="w-full h-px bg-slate-100" />

            <div className="flex flex-col gap-3">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Quick Actions</span>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors border border-slate-100 shadow-sm">
                <CalendarClock className="w-4 h-4 text-[#3DD9FF]" /> Generate Monthly Report
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors border border-slate-100 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#72F1D1]" /> Bulk Approve Leaves
              </button>
            </div>

          </div>
        </SectionCard>
      </div>

    </div>
  );
}
