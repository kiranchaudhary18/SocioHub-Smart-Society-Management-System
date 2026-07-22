import { Search, Filter, RefreshCcw, Bookmark } from "lucide-react";

interface Props {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  typeFilter: string;
  setTypeFilter: (v: string) => void;
  yearFilter: string;
  setYearFilter: (v: string) => void;
  bookmarkedOnly: boolean;
  setBookmarkedOnly: (v: boolean) => void;
  onReset: () => void;
}

export function DocumentToolbar({
  searchTerm, setSearchTerm,
  typeFilter, setTypeFilter,
  yearFilter, setYearFilter,
  bookmarkedOnly, setBookmarkedOnly,
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
          placeholder="Search documents by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8F7CFF]/50 focus:border-[#8F7CFF] transition-all"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
        <button 
          onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border ${bookmarkedOnly ? 'bg-amber-400/10 text-amber-500 border-amber-400/30' : 'bg-white border-slate-200 text-slate-600'}`}
        >
          <Bookmark className="w-4 h-4" />
          Saved
        </button>

        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
          <Filter className="w-4 h-4 text-slate-400" />
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-transparent text-sm font-bold text-slate-600 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Types</option>
            <option value="PDF">PDF</option>
            <option value="DOCX">DOCX</option>
            <option value="XLSX">XLSX</option>
            <option value="PNG">Images</option>
          </select>
        </div>

        <select 
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:outline-none focus:border-[#8F7CFF] cursor-pointer"
        >
          <option value="ALL">Any Year</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
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
