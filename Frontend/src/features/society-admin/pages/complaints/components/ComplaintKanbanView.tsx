import { motion } from "framer-motion";
import type { Complaint } from "../../../services/complaint.service";
import { Link } from "react-router-dom";
import { Clock, MapPin, MoreVertical, Wrench, Droplets, Zap, Shield, Sparkles } from "lucide-react";

interface ComplaintKanbanViewProps {
  complaints: Complaint[];
  isLoading: boolean;
}

const COLUMNS = [
  { id: "NEW", title: "New", color: "bg-[#FF7A7A]/10 border-[#FF7A7A]/20 text-[#FF7A7A]" },
  { id: "ASSIGNED", title: "Assigned", color: "bg-[#FFD166]/10 border-[#FFD166]/20 text-amber-700" },
  { id: "IN_PROGRESS", title: "In Progress", color: "bg-[#3DD9FF]/10 border-[#3DD9FF]/20 text-sky-700" },
  { id: "WAITING", title: "Waiting", color: "bg-[#8F7CFF]/10 border-[#8F7CFF]/20 text-[#8F7CFF]" },
  { id: "RESOLVED", title: "Resolved", color: "bg-[#72F1D1]/20 border-[#72F1D1]/30 text-emerald-700" },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "PLUMBING": return <Droplets className="w-3.5 h-3.5" />;
    case "ELECTRICAL": return <Zap className="w-3.5 h-3.5" />;
    case "CARPENTRY": return <Wrench className="w-3.5 h-3.5" />;
    case "CLEANING": return <Sparkles className="w-3.5 h-3.5" />;
    case "SECURITY": return <Shield className="w-3.5 h-3.5" />;
    default: return <Wrench className="w-3.5 h-3.5" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "URGENT": return "text-[#FF7A7A] bg-[#FF7A7A]/10";
    case "HIGH": return "text-[#FFD166] bg-[#FFD166]/10";
    case "MEDIUM": return "text-[#3DD9FF] bg-[#3DD9FF]/10";
    case "LOW": return "text-slate-500 bg-slate-100";
    default: return "text-slate-500 bg-slate-100";
  }
};

export function ComplaintKanbanView({ complaints, isLoading }: ComplaintKanbanViewProps) {
  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4 h-[600px]">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="min-w-[300px] w-[300px] bg-slate-50/50 rounded-3xl p-4 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-6 h-[calc(100vh-320px)] min-h-[500px]">
      {COLUMNS.map((column) => {
        const columnComplaints = complaints.filter(c => c.status === column.id);
        
        return (
          <div key={column.id} className="flex flex-col min-w-[320px] w-[320px] bg-white/40 backdrop-blur-sm border border-white/80 rounded-[32px] overflow-hidden">
            
            {/* Column Header */}
            <div className={`p-4 border-b border-white/50 flex items-center justify-between bg-white/60`}>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-xl text-xs font-black uppercase tracking-widest border ${column.color}`}>
                  {column.title}
                </span>
              </div>
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                {columnComplaints.length}
              </span>
            </div>

            {/* Column Content */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {columnComplaints.map((complaint, index) => (
                <motion.div
                  key={complaint.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-[#8F7CFF]/30 transition-all group cursor-grab active:cursor-grabbing flex flex-col gap-3"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md tracking-wider">
                      {complaint.id}
                    </span>
                    <button className="text-slate-300 hover:text-slate-500 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <Link to={`/admin/complaints/${complaint.id}`} className="font-bold text-slate-800 leading-tight hover:text-[#8F7CFF] transition-colors">
                    {complaint.title}
                  </Link>
                  
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-[#8F7CFF]" />
                    {complaint.residentName} ({complaint.flat})
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                      {getCategoryIcon(complaint.category)}
                      {complaint.category}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${getPriorityColor(complaint.priority)}`}>
                      {complaint.priority}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                      <Clock className="w-3 h-3" /> {complaint.createdAt}
                    </div>
                    {complaint.assignedTo ? (
                      <div className="flex items-center gap-1.5" title={`Assigned to: ${complaint.assignedTo}`}>
                        <span className="text-[10px] font-bold text-slate-400">{complaint.assignedTo.split(' ')[0]}</span>
                        <img 
                          src={complaint.assignedStaffAvatar || `https://ui-avatars.com/api/?name=${complaint.assignedTo}&background=f1f5f9&color=64748b`} 
                          alt="Staff" 
                          className="w-6 h-6 rounded-full border border-slate-200"
                        />
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 italic">Unassigned</span>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {columnComplaints.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                  <span className="text-sm font-bold text-slate-400">No complaints</span>
                </div>
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
}
