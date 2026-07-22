import { useState, useMemo } from "react";
import { Eye, Search, Filter, MessageSquare, Plus } from "lucide-react";
import type { Complaint } from "../../../services/complaint.service";

interface Props {
  complaints: Complaint[];
  onViewDetails: (complaint: Complaint) => void;
  onNewComplaint: () => void;
}

export function ComplaintsTable({ complaints, onViewDetails, onNewComplaint }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const filteredComplaints = useMemo(() => {
    return complaints.filter(c => {
      const matchSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === "ALL" || c.status === statusFilter;
      const matchCategory = categoryFilter === "ALL" || c.category === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [complaints, searchTerm, statusFilter, categoryFilter]);

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "OPEN": return <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-[10px] font-bold uppercase tracking-wider">Open</span>;
      case "IN_PROGRESS": return <span className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg text-[10px] font-bold uppercase tracking-wider">In Progress</span>;
      case "RESOLVED": return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[10px] font-bold uppercase tracking-wider">Resolved</span>;
      case "REJECTED": return <span className="px-3 py-1 bg-red-50 text-red-600 border border-red-100 rounded-lg text-[10px] font-bold uppercase tracking-wider">Rejected</span>;
      case "CLOSED": return <span className="px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-wider">Closed</span>;
      default: return null;
    }
  };

  const renderPriorityBadge = (priority: string) => {
    switch (priority) {
      case "URGENT": return <span className="text-xs font-black text-red-500">Urgent</span>;
      case "HIGH": return <span className="text-xs font-bold text-amber-500">High</span>;
      case "MEDIUM": return <span className="text-xs font-bold text-blue-500">Medium</span>;
      case "LOW": return <span className="text-xs font-bold text-slate-500">Low</span>;
      default: return null;
    }
  };

  if (complaints.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-16 shadow-sm text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          <MessageSquare className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Complaints Found</h3>
        <p className="text-sm font-medium text-slate-500 max-w-md mb-6">You haven't raised any complaints yet.</p>
        <button 
          onClick={onNewComplaint}
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-sm transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Raise Complaint
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col gap-6">
      
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:w-96">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input 
            type="text" 
            placeholder="Search Title or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8F7CFF]/50 focus:border-[#8F7CFF] transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
            <Filter className="w-4 h-4 text-slate-400" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-600 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Status</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:outline-none focus:border-[#8F7CFF] cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Lift">Lift</option>
            <option value="Parking">Parking</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Complaint Details</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Created On</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredComplaints.length === 0 ? (
               <tr>
                 <td colSpan={6} className="px-4 py-8 text-center text-sm font-medium text-slate-500">
                   No complaints match your filters.
                 </td>
               </tr>
            ) : filteredComplaints.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => onViewDetails(c)}>
                <td className="px-4 py-4">
                  <div className="flex flex-col gap-1 max-w-xs">
                    <span className="text-xs font-black text-slate-400 font-mono tracking-wider">{c.id}</span>
                    <span className="text-sm font-bold text-slate-800 truncate">{c.title}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-bold text-slate-600">{c.category}</span>
                </td>
                <td className="px-4 py-4">
                  {renderPriorityBadge(c.priority)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">
                      {new Date(c.createdOn).toLocaleDateString()}
                    </span>
                    <span className="text-xs font-medium text-slate-500 mt-0.5">
                      {new Date(c.createdOn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  {renderStatusBadge(c.status)}
                </td>
                <td className="px-4 py-4 text-right">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onViewDetails(c); }}
                    className="inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-200 hover:border-[#8F7CFF] text-slate-600 hover:text-[#8F7CFF] hover:bg-[#8F7CFF]/5 rounded-xl text-sm font-bold shadow-sm transition-all"
                  >
                    <Eye className="w-4 h-4 mr-2" /> View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
