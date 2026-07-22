import { Search, Filter, RefreshCcw } from "lucide-react";

interface Props {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  typeFilter: string;
  setTypeFilter: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  dateFilter: string;
  setDateFilter: (v: string) => void;
  onReset: () => void;
}

export function HistoryToolbar({
  searchTerm, setSearchTerm,
  typeFilter, setTypeFilter,
  statusFilter, setStatusFilter,
  dateFilter, setDateFilter,
  onReset
}: Props) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[24px] p-4 shadow-sm flex flex-col xl:flex-row gap-4 items-center justify-between">
      <div className="relative w-full xl:w-96">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input 
          type="text" 
          placeholder="Search visitor or vehicle..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8F7CFF]/50 focus:border-[#8F7CFF] transition-all"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
          <Filter className="w-4 h-4 text-slate-400" />
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-transparent text-sm font-bold text-slate-600 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Types</option>
            <option value="Guest">Guest</option>
            <option value="Friend">Friend</option>
            <option value="Delivery">Delivery</option>
            <option value="Service">Service</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:outline-none focus:border-[#8F7CFF] cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="COMPLETED">Completed</option>
          <option value="ACTIVE">Active (Inside)</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="DENIED">Denied</option>
        </select>

        <select 
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:outline-none focus:border-[#8F7CFF] cursor-pointer"
        >
          <option value="ALL">All Time</option>
          <option value="TODAY">Today</option>
          <option value="WEEK">This Week</option>
          <option value="MONTH">This Month</option>
        </select>

        <button 
          onClick={onReset}
          className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
          title="Reset Filters"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
