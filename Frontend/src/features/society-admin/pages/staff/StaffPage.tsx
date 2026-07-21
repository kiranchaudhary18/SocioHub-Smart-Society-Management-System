import { useState, useEffect } from "react";
import { staffService } from "../../services/staff.service";
import type { Staff, StaffStats } from "../../services/staff.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatCard } from "../../components/ui/StatCard";
import { StaffCardView } from "./components/StaffCardView";
import { StaffTableView } from "./components/StaffTableView";
import { 
  Users, UserCheck, UserMinus, CalendarClock, Briefcase, LayoutGrid, List, Plus, Download, Upload, Search, Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StaffPage() {
  const [view, setView] = useState<'card' | 'table'>('card');
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [stats, setStats] = useState<StaffStats | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [staffData, statsData] = await Promise.all([
        staffService.getStaffList(),
        staffService.getStats()
      ]);
      setStaffList(staffData);
      setStats(statsData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredStaff = staffList.filter(s => 
    `${s.firstName} ${s.lastName} ${s.role} ${s.department} ${s.id}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Staff Management</h1>
          <p className="text-slate-500 font-medium mt-1">Manage housekeeping, electricians, plumbers, and other employees.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ActionButton variant="outline" leftIcon={<Upload className="w-4 h-4" />}>Import</ActionButton>
          <ActionButton variant="outline" leftIcon={<Download className="w-4 h-4" />}>Export</ActionButton>
          <ActionButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>Add Staff</ActionButton>
        </div>
      </div>

      {/* KPI Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard title="Total Staff" value={stats.totalStaff} icon={<Users className="w-5 h-5 text-[#8F7CFF]" />} delay={0.1} />
          <StatCard title="Active Staff" value={stats.activeStaff} icon={<UserCheck className="w-5 h-5 text-[#72F1D1]" />} delay={0.15} />
          <StatCard title="On Leave" value={stats.onLeave} icon={<UserMinus className="w-5 h-5 text-[#FFD166]" />} delay={0.2} />
          <StatCard title="Attendance" value={`${stats.todaysAttendance}%`} icon={<CalendarClock className="w-5 h-5 text-[#3DD9FF]" />} delay={0.25} trend={{ value: 2, isPositive: true }} />
          <StatCard title="New Staff" value={stats.newStaff} icon={<Users className="w-5 h-5 text-[#FF7A7A]" />} delay={0.3} />
          <StatCard title="Departments" value={stats.departments} icon={<Briefcase className="w-5 h-5 text-slate-400" />} delay={0.35} />
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[24px] p-2 flex flex-col md:flex-row items-center gap-2 relative z-20">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-[16px] border border-slate-100 w-full">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search by ID, name, role, or department..." 
            className="w-full bg-transparent outline-none text-slate-700 font-medium placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between md:justify-end gap-2 w-full md:w-auto px-2">
          <button className="flex items-center gap-2 px-4 py-3 rounded-[16px] bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors border border-slate-100">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <div className="w-px h-8 bg-slate-200 hidden md:block mx-2" />

          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-[16px]">
            <button 
              onClick={() => setView('card')}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${view === 'card' ? 'bg-white text-[#8F7CFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              title="Card View"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setView('table')}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${view === 'table' ? 'bg-white text-[#8F7CFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              title="Table View"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {view === 'card' ? (
            <StaffCardView staffList={filteredStaff} isLoading={isLoading} />
          ) : (
            <StaffTableView staffList={filteredStaff} isLoading={isLoading} />
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
