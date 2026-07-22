import { Search, Filter, RefreshCcw, CheckCircle2 } from "lucide-react";

interface Props {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  categoryFilter: string;
  setCategoryFilter: (v: string) => void;
  priorityFilter: string;
  setPriorityFilter: (v: string) => void;
  unreadOnly: boolean;
  setUnreadOnly: (v: boolean) => void;
  onReset: () => void;
}

export function NoticeToolbar({
  searchTerm, setSearchTerm,
  categoryFilter, setCategoryFilter,
  priorityFilter, setPriorityFilter,
  unreadOnly, setUnreadOnly,
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
          placeholder="Search notices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8F7CFF]/50 focus:border-[#8F7CFF] transition-all"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
        <button 
          onClick={() => setUnreadOnly(!unreadOnly)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${unreadOnly ? 'bg-[#8F7CFF]/10 text-[#8F7CFF] border-[#8F7CFF]/30' : 'bg-white border-slate-200 text-slate-600'}`}
        >
          <CheckCircle2 className="w-4 h-4" />
          Unread
        </button>

        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
          <Filter className="w-4 h-4 text-slate-400" />
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-transparent text-sm font-bold text-slate-600 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            <option value="Meeting">Meeting</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Rules">Rules</option>
            <option value="General">General</option>
          </select>
        </div>

        <select 
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:outline-none focus:border-[#8F7CFF] cursor-pointer"
        >
          <option value="ALL">Any Priority</option>
          <option value="HIGH">High Priority</option>
          <option value="NORMAL">Normal Priority</option>
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
