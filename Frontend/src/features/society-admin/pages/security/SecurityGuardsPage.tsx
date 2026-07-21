import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { securityService } from "../../services/security.service";
import type { SecurityGuard, SecurityStats } from "../../services/security.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatCard } from "../../components/ui/StatCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { 
  ShieldCheck, ShieldAlert, ShieldOff, Sun, Moon,
  Plus, CalendarClock, Search, Filter, MoreVertical, Phone
} from "lucide-react";
import { motion } from "framer-motion";

export default function SecurityGuardsPage() {
  const [guards, setGuards] = useState<SecurityGuard[]>([]);
  const [stats, setStats] = useState<SecurityStats | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [guardsData, statsData] = await Promise.all([
        securityService.getGuards(),
        securityService.getStats()
      ]);
      setGuards(guardsData);
      setStats(statsData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredGuards = guards.filter(g => 
    `${g.firstName} ${g.lastName} ${g.assignedGate} ${g.id}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ON_DUTY": return "success";
      case "ON_LEAVE": return "warning";
      case "OFF_DUTY": return "neutral";
      default: return "neutral";
    }
  };

  const getShiftIcon = (shift: string) => {
    switch (shift) {
      case "MORNING": return <Sun className="w-3.5 h-3.5 text-[#FFD166]" />;
      case "NIGHT": return <Moon className="w-3.5 h-3.5 text-[#8F7CFF]" />;
      default: return <Sun className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Security Guards</h1>
          <p className="text-slate-500 font-medium mt-1">Monitor guards, shifts, and gate assignments.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ActionButton variant="outline" leftIcon={<CalendarClock className="w-4 h-4" />}>Assign Shift</ActionButton>
          <ActionButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>Add Guard</ActionButton>
        </div>
      </div>

      {/* KPI Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard title="Total Guards" value={stats.totalGuards} icon={<ShieldCheck className="w-5 h-5 text-[#8F7CFF]" />} delay={0.1} />
          <StatCard title="On Duty" value={stats.onDuty} icon={<ShieldCheck className="w-5 h-5 text-[#72F1D1]" />} delay={0.15} />
          <StatCard title="Off Duty" value={stats.offDuty} icon={<ShieldOff className="w-5 h-5 text-slate-400" />} delay={0.2} />
          <StatCard title="Morning Shift" value={stats.morningShift} icon={<Sun className="w-5 h-5 text-[#FFD166]" />} delay={0.25} />
          <StatCard title="Night Shift" value={stats.nightShift} icon={<Moon className="w-5 h-5 text-[#8F7CFF]" />} delay={0.3} />
          <StatCard title="Attendance" value={`${stats.todaysAttendance}%`} icon={<ShieldAlert className="w-5 h-5 text-[#3DD9FF]" />} delay={0.35} trend={{ value: 0, isPositive: true }} />
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[24px] p-2 flex flex-col md:flex-row items-center gap-2">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-[16px] border border-slate-100 w-full">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search guards by name, ID, or gate..." 
            className="w-full bg-transparent outline-none text-slate-700 font-medium placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 rounded-[16px] bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors border border-slate-100 w-full md:w-auto">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="w-full bg-white/60 rounded-[32px] overflow-hidden p-6 animate-pulse">
          <div className="h-12 bg-slate-100/50 rounded-2xl mb-4" />
          {[1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-slate-100/30 rounded-2xl mb-2" />)}
        </div>
      ) : (
        <div className="w-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-5 whitespace-nowrap">Guard</th>
                  <th className="px-6 py-5 whitespace-nowrap">Assigned Gate</th>
                  <th className="px-6 py-5 whitespace-nowrap">Current Shift</th>
                  <th className="px-6 py-5 whitespace-nowrap">Status</th>
                  <th className="px-6 py-5 whitespace-nowrap">Contact</th>
                  <th className="px-6 py-5 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuards.map((guard, i) => (
                  <motion.tr 
                    key={guard.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="group border-b border-slate-50 hover:bg-white transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <img src={guard.photo || `https://ui-avatars.com/api/?name=${guard.firstName}+${guard.lastName}&background=f8fafc&color=94a3b8`} alt={guard.firstName} className="w-10 h-10 rounded-xl object-cover shadow-sm" />
                        <div className="flex flex-col">
                          <Link to={`/admin/security/${guard.id}`} className="font-bold text-slate-800 hover:text-[#8F7CFF] transition-colors">
                            {guard.firstName} {guard.lastName}
                          </Link>
                          <span className="text-[10px] font-black tracking-wider text-slate-400 mt-0.5">{guard.id}</span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-slate-700">{guard.assignedGate}</span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-sm font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg w-fit">
                        {getShiftIcon(guard.currentShift)}
                        {guard.currentShift}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge variant={getStatusVariant(guard.status) as any}>
                        {guard.status.replace('_', ' ')}
                      </StatusBadge>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {guard.phone}
                      </span>
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
          
          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-white/30">
            <span className="text-sm font-bold text-slate-500">Showing {filteredGuards.length} guards</span>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:border-[#8F7CFF] hover:text-[#8F7CFF] transition-colors">Next</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
