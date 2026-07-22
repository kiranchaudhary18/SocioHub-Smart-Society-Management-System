import { Search, Filter, RefreshCcw } from "lucide-react";

interface Props {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  relationshipFilter: string;
  setRelationshipFilter: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  ageFilter: string;
  setAgeFilter: (v: string) => void;
  onReset: () => void;
}

export function FamilyToolbar({
  searchTerm, setSearchTerm,
  relationshipFilter, setRelationshipFilter,
  statusFilter, setStatusFilter,
  ageFilter, setAgeFilter,
  onReset
}: Props) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl p-4 shadow-sm flex flex-col xl:flex-row gap-4 items-center justify-between">
      <div className="relative w-full xl:w-96">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input 
          type="text" 
          placeholder="Search member name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8F7CFF]/50 focus:border-[#8F7CFF] transition-all"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
          <Filter className="w-4 h-4 text-slate-400" />
          <select 
            value={relationshipFilter}
            onChange={(e) => setRelationshipFilter(e.target.value)}
            className="bg-transparent text-sm font-bold text-slate-600 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Relations</option>
            <option value="Spouse">Spouse</option>
            <option value="Child">Child</option>
            <option value="Parent">Parent</option>
            <option value="Sibling">Sibling</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:outline-none focus:border-[#8F7CFF] cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="VERIFIED">Verified</option>
          <option value="PENDING">Pending</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <select 
          value={ageFilter}
          onChange={(e) => setAgeFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:outline-none focus:border-[#8F7CFF] cursor-pointer"
        >
          <option value="ALL">All Ages</option>
          <option value="CHILD">Under 18</option>
          <option value="ADULT">18 - 60</option>
          <option value="SENIOR">60+</option>
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
